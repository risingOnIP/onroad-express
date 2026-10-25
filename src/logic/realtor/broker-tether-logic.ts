import { createClient } from "@supabase/supabase-js";
import { getProfile } from "../profile-logic";
import { BrokerRealtorTether } from "../../types/tethers";

export async function createBrokerRealtorTether(
    brokerLicense: string,
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>,
    deleteExisting: boolean = false
): Promise<BrokerRealtorTether> {
    const realtorProfile = await getProfile(realtorUserId, 'realtor', supabase);

    // If deleteExisting is true, delete any accepted tethers first
    if (deleteExisting) {
        console.log("Deleting existing accepted tethers before creating new one");
        const { error: deleteError } = await supabase
            .from('brokerRealtorTether')
            .delete()
            .eq('realtor_id', realtorUserId)
            .eq('status', 'accepted');
        
        if (deleteError) {
            console.error("Error deleting existing tethers:", deleteError);
            throw new Error("Failed to remove existing broker connection");
        }
    }

    // Create the tether
    const { data: newTether, error: tetherError } = await supabase
        .from('brokerRealtorTether')
        .insert({
            realtor_id: realtorUserId,
            broker_license: brokerLicense,
            realtor_email: realtorProfile.email,
            realtor_full_name: realtorProfile.firstName + ' ' + realtorProfile.lastName
        })
        .select()
        .single();

    if (tetherError) {
        console.error("Error creating broker-realtor tether:", tetherError);
        throw new Error("Failed to create broker-realtor tether");
    }
    return newTether as unknown as BrokerRealtorTether;
}

export async function getAllBrokerRealtorTethers(
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether[]> {
    // First get the realtor's email
    const { data: realtorProfile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', realtorUserId)
        .single();
    
    if (profileError || !realtorProfile) {
        console.error("Error getting realtor profile:", profileError);
        throw new Error("Failed to fetch realtor profile");
    }

    // Fetch tethers by both realtor_id OR email
    // This allows realtors to see tethers initiated by brokers (no realtor_id)
    const { data, error } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .or(`realtor_id.eq.${realtorUserId},realtor_email.eq.${realtorProfile.email}`)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error getting all broker-realtor tethers:", error);
        throw new Error("Failed to fetch broker-realtor tethers");
    }

    return (data || []) as unknown as BrokerRealtorTether[];
}

export async function getAcceptedBrokerRealtorTethers(
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether[]> {
    console.log("Getting accepted broker-realtor tethers for realtor:", realtorUserId);
    
    // Get realtor's email first
    const { data: realtorProfile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('user_id', realtorUserId)
        .single();
    
    if (profileError || !realtorProfile) {
        console.error("Error getting realtor profile:", profileError);
        throw new Error("Failed to fetch realtor profile");
    }
    
    // Get accepted tethers by both realtor_id OR email
    const { data, error } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .or(`realtor_id.eq.${realtorUserId},realtor_email.eq.${realtorProfile.email}`)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error getting accepted broker-realtor tethers:", error);
        throw new Error("Failed to fetch accepted broker-realtor tethers");
    }

    console.log("Found accepted tethers:", data);
    
    // For each tether, get the broker profile if broker_id exists
    const tethersWithBrokerInfo = await Promise.all((data || []).map(async (tether: any) => {
        if (tether.broker_id) {
            // Fetch broker profile
            const { data: brokerProfile, error: profileError } = await supabase
                .from('profiles')
                .select('firstName, lastName, email')
                .eq('user_id', tether.broker_id)
                .single();
            
            if (!profileError && brokerProfile) {
                console.log("Found broker profile:", brokerProfile);
                return {
                    ...tether,
                    broker_full_name: `${brokerProfile.firstName} ${brokerProfile.lastName}`,
                    broker_email: brokerProfile.email
                };
            }
        }
        
        // Return tether as-is if no broker_id or profile fetch failed
        return tether;
    }));
    
    console.log("Tethers with broker info:", tethersWithBrokerInfo);
    return tethersWithBrokerInfo as unknown as BrokerRealtorTether[];
}

export async function acceptTetherConnection(
    tetherId: string,
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>
): Promise<BrokerRealtorTether> {
    const realtorProfile = await getProfile(realtorUserId, 'realtor', supabase);
    
    // First verify this tether belongs to this realtor (by ID or email)
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .or(`realtor_id.eq.${realtorUserId},realtor_email.eq.${realtorProfile.email}`)
        .single();

    if (fetchError || !existingTether) {
        throw new Error("Tether not found or does not belong to this realtor");
    }

    // If this is a broker-initiated tether (no realtor_id), add the realtor_id
    // This marks it as accepted by the realtor
    const updateData: any = { 
        status: 'accepted',
        realtor_email: realtorProfile.email,
        realtor_full_name: realtorProfile.firstName + ' ' + realtorProfile.lastName
    };
    
    // Only add realtor_id if it's not already set (broker-initiated tether)
    if (!existingTether.realtor_id) {
        updateData.realtor_id = realtorUserId;
    }

    // Update the tether
    const { data, error } = await supabase
        .from('brokerRealtorTether')
        .update(updateData)
        .eq('id', tetherId)
        .select()
        .single();

    if (error) {
        console.error("Error accepting tether connection:", error);
        throw new Error("Failed to accept tether connection");
    }

    return data as unknown as BrokerRealtorTether;
}

export async function deleteBrokerRealtorTether(
    tetherId: string,
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>
): Promise<void> {
    console.log("Deleting broker-realtor tether:", tetherId, "for realtor:", realtorUserId);
    
    // First verify this tether belongs to this realtor and is accepted
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .eq('realtor_id', realtorUserId)
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
        .eq('realtor_id', realtorUserId);

    if (deleteError) {
        console.error("Error deleting broker-realtor tether:", deleteError);
        throw new Error("Failed to delete broker-realtor tether");
    }

    console.log("Successfully deleted broker-realtor tether");
}

export async function cancelPendingBrokerRealtorTether(
    tetherId: string,
    realtorUserId: string,
    supabase: ReturnType<typeof createClient>
): Promise<void> {
    console.log("Canceling pending broker-realtor tether:", tetherId, "for realtor:", realtorUserId);
    
    // First verify this tether belongs to this realtor and is pending
    const { data: existingTether, error: fetchError } = await supabase
        .from('brokerRealtorTether')
        .select('*')
        .eq('id', tetherId)
        .eq('realtor_id', realtorUserId)
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
        .eq('realtor_id', realtorUserId);

    if (deleteError) {
        console.error("Error canceling pending broker-realtor tether:", deleteError);
        throw new Error("Failed to cancel pending broker-realtor tether");
    }

    console.log("Successfully canceled pending broker-realtor tether");
}

