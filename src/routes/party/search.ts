import { Router } from "express";
import { Search } from "../../types/party";
import { addSearch, getAllSearches, getSearchById, getSearchesWithoutRealtor } from "../../logic/party/search-logic";



const router = Router();

router.get('/id/:searchId', async (req, res) => {
  try {
    const {searchId} = req.params; 
    const returning : Search = await getSearchById(searchId, req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /get-by-dealid; failed to get schema by dealId"});
  }
})

router.get('/all', async (req, res) => {
  try {
    const returning : Search [] = await getAllSearches(req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /all; failed to get all searches"});
  }
})

router.get('/no-realtor-searches', async (req, res) => {
  try {
    const returning : Search [] = await getSearchesWithoutRealtor(req.supabaseClient!);
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /no-realtor-searches; failed to get searches without realtor"});
  }
})


router.post('/', async (req, res) => {
  try {
    const { newSearch, implicitlyTether } = req.body; 
    const returning : Partial<Search> = await addSearch(newSearch, implicitlyTether, req.supabaseClient!);
    
    res.json(returning);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({error: "Error: /add-search; failed to add search"});
  }
})



export default router;
