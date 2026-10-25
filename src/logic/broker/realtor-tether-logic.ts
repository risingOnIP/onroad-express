import { createClient } from "@supabase/supabase-js";
import { getProfile } from "../profile-logic";
import { BrokerRealtorTether } from "../../types/tethers";



export async function getAllRealtorTethers(
    brokerLicense: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether[]> {
    const { data: tethers, error } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('broker_license', brokerLicense)
        .order('created_at', { ascending: false });


        return tethers as unknown as BrokerRealtorTether[];
}

export async function getAcceptedRealtorTethers(
    brokerLicense: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether[]> {
    const { data: tethers, error } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('broker_license', brokerLicense)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error getting accepted realtor tethers:", error);
        throw new Error("Failed to fetch accepted realtor tethers");
    }

    return tethers as unknown as BrokerRealtorTether[];
}

export async function acceptRealtorTether(
    tetherId: string,
    brokerId: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether> {

    // Update the status to accepted
    const brokerProfile = await getProfile(brokerId, 'broker', supabase);
    const { data, error } = await supabase
        .from('brokerRealtorTether')
        .update({ status: 'accepted', broker_id: brokerId, broker_email: brokerProfile.email, broker_full_name: brokerProfile.firstName + ' ' + brokerProfile.lastName })
        .eq('id', tetherId)
        .select()
        .single();

    if (error) {
        console.error("Error accepting tether connection:", error);
        throw new Error("Failed to accept tether connection");
    }

    return data as unknown as BrokerRealtorTether;
}


export async function denyRealtorTether(
    tetherId: string,
    brokerLicense: string,
    brokerId: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether> {
    // First verify this tether belongs to this broker
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .eq('broker_license', brokerLicense)
        .single();

    if (fetchError || !existingTether) {
        throw new Error("Tether not found or does not belong to this broker");
    }

    // Update the status to denied
    const { data, error } = await supabase
        .from('brokerRealtorTether')
        .update({ status: 'denied', broker_id: brokerId })
        .eq('id', tetherId)
        .select()
        .single();

    if (error) {
        console.error("Error denying realtor tether:", error);
        throw new Error("Failed to deny realtor tether");
    }

    return data as unknown as BrokerRealtorTether;
}

export async function createRealtorTetherByEmail(
    realtorEmail: string,
    brokerLicense: string,
    brokerId: string,
    supabase: ReturnType<typeof createClient>,
    deleteExisting: boolean = false
): Promise<BrokerRealtorTether> {
    const brokerProfile = await getProfile(brokerId, 'broker', supabase);
    
    // Check if realtor exists
    const { data: realtorProfile, error: realtorError } = await supabase
        .from('profiles')
        .select('userId, firstName, lastName, email')
        .eq('email', realtorEmail)
        .eq('usertype', 'realtor')
        .single();
    
    // Prepare tether data - will work whether realtor exists or not
    let realtorId: string | null = null;
    let realtorFullName: string | null = null;
    
    if (realtorProfile && !realtorError) {
        // Realtor exists, use their info
        realtorId = realtorProfile.userId as string;
        realtorFullName = `${realtorProfile.firstName} ${realtorProfile.lastName}`;
        
        // If deleteExisting is true, delete any accepted tethers first
        if (deleteExisting) {
            console.log("Deleting existing accepted tethers before creating new one");
            const { error: deleteError } = await supabase
                .from('brokerRealtorTether')
                .delete()
                .eq('broker_license', brokerLicense)
                .eq('realtor_id', realtorId)
                .eq('status', 'accepted');
            
            if (deleteError) {
                console.error("Error deleting existing tethers:", deleteError);
                throw new Error("Failed to remove existing realtor connection");
            }
        }
        
        // Check if ANY tether already exists (pending or accepted) for this realtor
        const { data: existingTethers } = await supabase
            .from('brokerRealtorTether')
            .select('*')
            .eq('broker_license', brokerLicense)
            .eq('realtor_id', realtorId)
            .in('status', ['pending', 'accepted']);
        
        if (existingTethers && existingTethers.length > 0) {
            const existingTether = existingTethers[0];
            if (existingTether.status === 'pending') {
                throw new Error("A pending tether request already exists for this realtor");
            } else if (existingTether.status === 'accepted') {
                throw new Error("An active tether already exists with this realtor");
            }
        }
    } else {
        // Realtor doesn't exist - check for existing tethers by email
        console.log("Realtor not found in profiles, will create tether with email only");
        
        // Check if ANY tether already exists for this email
        const { data: existingTethers } = await supabase
            .from('brokerRealtorTether')
            .select('*')
            .eq('broker_license', brokerLicense)
            .eq('realtor_email', realtorEmail)
            .in('status', ['pending', 'accepted']);
        
        if (existingTethers && existingTethers.length > 0) {
            const existingTether = existingTethers[0];
            if (existingTether.status === 'pending') {
                throw new Error("A pending tether request already exists for this email");
            } else if (existingTether.status === 'accepted') {
                throw new Error("An active tether already exists with this email");
            }
        }
    }

    // Create the tether with whatever info we have
    const { data: newTether, error: tetherError } = await supabase
        .from('brokerRealtorTether')
        .insert({
            realtor_id: realtorId, // Can be null if realtor doesn't exist
            broker_license: brokerLicense,
            broker_id: brokerId,
            broker_email: brokerProfile.email,
            broker_full_name: `${brokerProfile.firstName} ${brokerProfile.lastName}`,
            realtor_email: realtorEmail, // Always have this
            realtor_full_name: realtorFullName, // Can be null if realtor doesn't exist
            status: 'pending'
        })
        .select()
        .single();

    if (tetherError) {
        console.error("Error creating realtor tether:", tetherError);
        throw new Error("Failed to create realtor tether");
    }
    
    return newTether as unknown as BrokerRealtorTether;
}


export async function deleteRealtorTether(
    tetherId: string,
    brokerLicense: string,
    supabase: ReturnType<typeof createClient>
): Promise<void> {
    console.log("Deleting realtor tether:", tetherId, "for broker license:", brokerLicense);
    
    // First verify this tether belongs to this broker and is accepted
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .eq('broker_license', brokerLicense)
        .eq('status', 'accepted')
        .single();

    if (fetchError || !existingTether) {
        console.error("Tether not found or not accepted:", fetchError);
        throw new Error("Tether not found or not in accepted state");
    }

    // Delete the tether
    const { error: deleteError } = await supabase
        .from('brokerRealtorTether')
        .delete()
        .eq('id', tetherId)
        .eq('broker_license', brokerLicense);

    if (deleteError) {
        console.error("Error deleting realtor tether:", deleteError);
        throw new Error("Failed to delete realtor tether");
    }

    console.log("Successfully deleted realtor tether");
}

export async function cancelPendingRealtorTether(
    tetherId: string,
    brokerLicense: string,
    supabase: ReturnType<typeof createClient>
): Promise<void> {
    console.log("Canceling pending realtor tether:", tetherId, "for broker license:", brokerLicense);
    
    // First verify this tether belongs to this broker and is pending
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .eq('broker_license', brokerLicense)
        .eq('status', 'pending')
        .single();

    if (fetchError || !existingTether) {
        console.error("Pending tether not found:", fetchError);
        throw new Error("Pending tether not found");
    }

    // Delete the pending tether
    const { error: deleteError } = await supabase
        .from('brokerRealtorTether')
        .delete()
        .eq('id', tetherId)
        .eq('broker_license', brokerLicense);

    if (deleteError) {
        console.error("Error canceling pending realtor tether:", deleteError);
        throw new Error("Failed to cancel pending realtor tether");
    }

    console.log("Successfully canceled pending realtor tether");
}
