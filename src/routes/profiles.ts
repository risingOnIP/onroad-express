import { Router } from "express";
import { Profile } from "../types/realtor";
import { getProfile } from "../logic/profile-logic";

const router = Router(); 

//get a profile
router.get("/:role", async (req, res) => {

  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const { role } = req.params;
    const user_id = req.user.sub;
    const userProfile : Profile = await getProfile(user_id, role, req.supabaseClient!);
    console.log("userProfile: ", userProfile);
    res.json(userProfile);
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch deal option" });
  } 
});  

export default router; 