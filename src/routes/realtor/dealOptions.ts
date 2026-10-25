import { Router } from "express";
import {
  DealOption,
  DealOptionFormMerged,
  Form,
  PDFFormField,
  Template,
} from "../../types/realtor";
import {
  addFormToDealOption,
  getAllDealOptions,
  getAllDealOptionsWithForms,
  getDealOption,
  getDealOptionWithForms,
  insertDealOption,
  updateDealOption,
  uploadFormToDealOption,
  upload,
  createPdfWithOverlays,
  createPdfWithOverlaysAndUpdateForm,
  PdfOverlayData,
  uploadPropertyImagesToDealOption,
  deletePropertyImageFromDealOption,
  getPropertyImageSignedUrls,
  uploadImages,
  savePdfFieldMetadata,
  loadPdfFieldMetadata,
  deleteDealOption,
} from "../../logic/realtor/dealOption-logic";
import { getAllDealOptionParties } from "../../logic/realtor/deal_option_parties-actions";

const router = Router();

//get a specific deal option
router.get("/:dealOptionId", async (req, res) => {
  try {
    const { dealOptionId } = req.params;
    const dealOption: DealOption = await getDealOption(
      dealOptionId,
      req.supabaseClient!
    );
    res.json(dealOption);
  } catch (error) {
    console.error("Error fetching deal option:", error);
    res.status(500).json({ error: "Failed to fetch deal option" });
  }
});

// Get all deal options for a specific deal
router.get("/:dealId/all", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { dealId } = req.params;
    const dealOptions = await getAllDealOptions(dealId, req.supabaseClient!);
    res.json(dealOptions);
  } catch (error) {
    console.error("Error fetching deal options:", error);
    res.status(500).json({ error: "Failed to fetch deal options" });
  }
});

router.get("/:dealId/with-forms", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { dealId } = req.params;
    const dealOptionsPlusForms = await getAllDealOptionsWithForms(
      dealId,
      req.supabaseClient!
    );

    res.json(dealOptionsPlusForms);
  } catch (error) {
    console.error("Error fetching deal options:", error);
    res.status(500).json({ error: "Failed to fetch deal options" });
  }
});

// Get all deal options with their parties for a specific deal
router.get("/:dealId/with-parties", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { dealId } = req.params;
    
    // Get all deal options for the deal
    const dealOptions = await getAllDealOptions(dealId, req.supabaseClient!);
    
    // For each deal option, get its parties
    const dealOptionsWithParties = await Promise.all(
      dealOptions.map(async (dealOption: any) => {
        try {
          const parties = await getAllDealOptionParties(req.user!.sub, req.supabaseClient!);
          // Filter parties for this specific deal option
          const dealOptionParties = parties
            .filter((party: any) => party.deal_option_id === dealOption.id)
            .map((party: any) => ({
              id: party.party_id,
              full_name: party.parties?.full_name || '',
              email: party.parties?.email || '',
              phone_number: party.parties?.phone_number || '',
              party_role: party.party_role,
              current_transaction_status: party.parties?.current_transaction_status || '',
            }));
          
          return {
            id: dealOption.id,
            address: dealOption.address,
            deal_id: dealOption.deal_id,
            parties: dealOptionParties,
          };
        } catch (error) {
          console.error(`Error fetching parties for deal option ${dealOption.id}:`, error);
          return {
            id: dealOption.id,
            address: dealOption.address,
            deal_id: dealOption.deal_id,
            parties: [],
          };
        }
      })
    );

    res.json(dealOptionsWithParties);
  } catch (error) {
    console.error("Error fetching deal options with parties:", error);
    res.status(500).json({ error: "Failed to fetch deal options with parties" });
  }
});

// Create a new deal option for a specific deal
router.post("/:dealId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { dealId } = req.params;
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const dealOption: DealOption = await insertDealOption(
      address,
      dealId,
      req.supabaseClient!
    );
    const dealOptionId = dealOption.id;

    //need to return dealOption with the form
    const dealOptionWithForms: DealOptionFormMerged =
      await getDealOptionWithForms(dealOptionId, req.supabaseClient!);

    res.json(dealOptionWithForms);
  } catch (error) {
    console.error("Error putting in a deal option:", error);
    res.status(500).json({ error: "Failed to insert deal options" });
  }
});

router.post("/addform/:dealOptionId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    const { dealOptionId } = req.params;
    const { form_type, form_stage } = req.body;

    const newFormAdded = await addFormToDealOption(
      req.user.sub,
      dealOptionId,
      form_type,
      req.supabaseClient!,
      form_stage
    );

    res.json(newFormAdded);
  } catch (error) {
    console.error("Error adding a form to a deal option:", error);
    res.status(500).json({ error: "Failed to add a form to a deal option" });
  }
});

router.post(
  "/uploadform/:dealOptionId",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const file = req.file;
      const userId = req.user?.sub;
      const { dealOptionId } = req.params;
      const { formName, form_stage } = req.body;
      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Upload file to Supabase
      const result: Form = await uploadFormToDealOption(
        userId,
        file,
        dealOptionId,
        formName,
        req.supabaseClient!,
        form_stage
      );

      if (!result) {
        return res
          .status(400)
          .json({ error: "There has been an error uploading your form" });
      }

      res.json(result);
    } catch (error) {
      console.error("Upload route error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);





router.post(
  "/create-pdf-with-overlays",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const file = req.file;
      const userId = req.user?.sub;
      
      if (!file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Parse overlay data from request body
      let overlayData: PdfOverlayData;
      try {
        overlayData = JSON.parse(req.body.overlayData);
      } catch (error) {
        return res.status(400).json({ 
          error: "Invalid overlay data format. Must be valid JSON." 
        });
      }

      // Validate overlay data structure
      if (!overlayData.textFields && !overlayData.checkmarks && !overlayData.dateFields) {
        return res.status(400).json({ 
          error: "At least one of textFields, checkmarks, or dateFields must be provided" 
        });
      }

      // Set defaults for arrays if not provided
      overlayData.textFields = overlayData.textFields || [];
      overlayData.checkmarks = overlayData.checkmarks || [];
      overlayData.dateFields = overlayData.dateFields || [];
      overlayData.signatureFields = overlayData.signatureFields || [];

      // Validate required fields
      const validateCoordinates = (items: any[], type: string) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (typeof item.x !== 'number' || typeof item.y !== 'number') {
            throw new Error(`${type}[${i}] must have numeric x and y coordinates`);
          }
        }
      };

      validateCoordinates(overlayData.textFields, 'textFields');
      validateCoordinates(overlayData.checkmarks, 'checkmarks');
      validateCoordinates(overlayData.dateFields, 'dateFields');
      validateCoordinates(overlayData.signatureFields, 'signatureFields');

      // Additional validation for text fields
      for (let i = 0; i < overlayData.textFields.length; i++) {
        if (typeof overlayData.textFields[i].text !== 'string') {
          return res.status(400).json({ 
            error: `textFields[${i}] must have a string 'text' property` 
          });
        }
      }

      // Additional validation for checkmarks
      for (let i = 0; i < overlayData.checkmarks.length; i++) {
        if (typeof overlayData.checkmarks[i].checked !== 'boolean') {
          return res.status(400).json({ 
            error: `checkmarks[${i}] must have a boolean 'checked' property` 
          });
        }
      }

      // Additional validation for date fields
      for (let i = 0; i < overlayData.dateFields.length; i++) {
        if (typeof overlayData.dateFields[i].date !== 'string') {
          return res.status(400).json({ 
            error: `dateFields[${i}] must have a string 'date' property` 
          });
        }
      }

      // Additional validation for signature fields
      for (let i = 0; i < overlayData.signatureFields.length; i++) {
        const sig = overlayData.signatureFields[i];
        if (typeof sig.text !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'text' property` 
          });
        }
        if (typeof sig.fieldName !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'fieldName' property` 
          });
        }
        if (typeof sig.displayName !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'displayName' property` 
          });
        }
      }

      // Create PDF with overlays
      const result = await createPdfWithOverlays(
        userId,
        file,
        overlayData,
        req.supabaseClient!
      );

      res.json({
        success: true,
        pdfId: result.pdfId,
        filePath: result.filePath,
        message: "PDF created successfully with overlays"
      });

    } catch (error) {
      console.error("PDF overlay route error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  }
);

// New route for creating PDF with overlays and updating form
router.post(
  "/create-pdf-with-overlays-and-form/:formId",
  upload.single("pdf"),
  async (req, res) => {
    try {
      const file = req.file;
      const userId = req.user?.sub;
      const { formId } = req.params;
      
      if (!file) {
        return res.status(400).json({ error: "No PDF file provided" });
      }

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      if (!formId) {
        return res.status(400).json({ error: "Form ID is required" });
      }

      // Parse overlay data from request body
      let overlayData: PdfOverlayData;
      try {
        overlayData = JSON.parse(req.body.overlayData);
      } catch (error) {
        return res.status(400).json({ 
          error: "Invalid overlay data format. Must be valid JSON." 
        });
      }

      // Get optional form type from request
      const formType = req.body.formType || "pdf_with_overlays";

      // Validate overlay data structure
      if (!overlayData.textFields && !overlayData.checkmarks && !overlayData.dateFields && !overlayData.signatureFields) {
        return res.status(400).json({ 
          error: "At least one of textFields, checkmarks, dateFields, or signatureFields must be provided" 
        });
      }

      // Set defaults for arrays if not provided
      overlayData.textFields = overlayData.textFields || [];
      overlayData.checkmarks = overlayData.checkmarks || [];
      overlayData.dateFields = overlayData.dateFields || [];
      overlayData.signatureFields = overlayData.signatureFields || [];

      // Validate required fields (same validation as above)
      const validateCoordinates = (items: any[], type: string) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (typeof item.x !== 'number' || typeof item.y !== 'number') {
            throw new Error(`${type}[${i}] must have numeric x and y coordinates`);
          }
        }
      };

      validateCoordinates(overlayData.textFields, 'textFields');
      validateCoordinates(overlayData.checkmarks, 'checkmarks');
      validateCoordinates(overlayData.dateFields, 'dateFields');
      validateCoordinates(overlayData.signatureFields, 'signatureFields');

      // Additional validation for signature fields
      for (let i = 0; i < overlayData.signatureFields.length; i++) {
        const sig = overlayData.signatureFields[i];
        if (typeof sig.text !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'text' property` 
          });
        }
        if (typeof sig.fieldName !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'fieldName' property` 
          });
        }
        if (typeof sig.displayName !== 'string') {
          return res.status(400).json({ 
            error: `signatureFields[${i}] must have a string 'displayName' property` 
          });
        }
      }

      // Create PDF with overlays and update form
      const result = await createPdfWithOverlaysAndUpdateForm(
        userId,
        file,
        overlayData,
        req.supabaseClient!,
        formId,
        formType
      );

      res.json({
        success: true,
        pdfId: result.pdfId,
        filePath: result.filePath,
        formId: result.formId,
        message: "PDF created successfully with overlays and form updated"
      });

    } catch (error) {
      console.error("PDF overlay with form route error:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Internal server error" 
      });
    }
  }
);

// Update a specific deal option
router.patch("/:dealOptionId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealOptionId } = req.params;
    const updateData = req.body;

    // Remove any fields that shouldn't be updated directly
    const { id, created_at, ...allowedUpdateData } = updateData;

    if (Object.keys(allowedUpdateData).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update" });
    }

    const updatedDealOption = await updateDealOption(
      dealOptionId,
      allowedUpdateData,
      req.supabaseClient!
    );

    res.json(updatedDealOption);
  } catch (error) {
    console.error("Error updating deal option:", error);
    res.status(500).json({ error: "Failed to update deal option" });
  }
});

// Upload property images to a deal option
router.post(
  "/:dealOptionId/upload-images",
  uploadImages.array("images", 10), // Allow up to 10 images
  async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const userId = req.user?.sub;
      const { dealOptionId } = req.params;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "No image files provided" });
      }

      if (!userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Upload images to Supabase
      const result = await uploadPropertyImagesToDealOption(
        userId,
        files,
        dealOptionId,
        req.supabaseClient!
      );

      res.json({
        message: "Images uploaded successfully",
        uploadedImages: result.imagePaths,
        dealOption: result.dealOption,
      });
    } catch (error) {
      console.error("Image upload route error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Delete a property image from a deal option
router.delete("/:dealOptionId/images", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealOptionId } = req.params;
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({ error: "Image path is required" });
    }

    const updatedDealOption = await deletePropertyImageFromDealOption(
      imagePath,
      dealOptionId,
      req.supabaseClient!
    );

    res.json({
      message: "Image deleted successfully",
      dealOption: updatedDealOption,
    });
  } catch (error) {
    console.error("Image deletion route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get signed URLs for property images
router.get("/:dealOptionId/image-urls", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealOptionId } = req.params;

    // Get deal option to retrieve image paths
    const dealOption = await getDealOption(dealOptionId, req.supabaseClient!);
    const imagePaths = Array.isArray(dealOption.property_images) && 
      dealOption.property_images.every(item => typeof item === 'string') 
      ? dealOption.property_images as string[] 
      : [];

    if (imagePaths.length === 0) {
      return res.json({ imageUrls: {} });
    }

    // Get signed URLs for all images
    const signedUrls = await getPropertyImageSignedUrls(
      imagePaths,
      req.supabaseClient!
    );

    res.json({ imageUrls: signedUrls });
  } catch (error) {
    console.error("Image URLs route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to save PDF field metadata without generating PDF
router.post("/save-pdf-field-metadata/:formId", async (req, res) => {
  try {
    const { formId } = req.params as { formId: string };
    const { fields } = req.body as {fields: PDFFormField[]};
    
    if (!formId) {
      return res.status(400).json({ error: "Form ID is required" });
    }
    
    if (!fields || !Array.isArray(fields)) {
      return res.status(400).json({ error: "Fields array is required" });
    }
    
    const result = await savePdfFieldMetadata(formId, fields, req.supabaseClient!);
    
    res.json({
      message: "PDF field metadata saved successfully",
      ...result
    });
    
  } catch (error) {
    console.error("Error saving PDF field metadata:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ 
      error: "Failed to save PDF field metadata",
      details: errorMessage
    });
  }
});

// Route to load PDF field metadata
router.get("/load-pdf-field-metadata/:formId", async (req, res) => {
  try {
    const { formId } = req.params;
    
    if (!formId) {
      return res.status(400).json({ error: "Form ID is required" });
    }
    
    const fields = await loadPdfFieldMetadata(formId, req.supabaseClient!);
    
    res.json({
      success: true,
      fields
    });
    
  } catch (error) {
    console.error("Error loading PDF field metadata:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({ 
      error: "Failed to load PDF field metadata",
      details: errorMessage
    });
  }
});

// Delete a specific deal option
router.delete("/:dealOptionId", async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const { dealOptionId } = req.params;

    if (!dealOptionId) {
      return res.status(400).json({ error: "Deal option ID is required" });
    }

    const result = await deleteDealOption(dealOptionId, req.supabaseClient!);

    res.json({
      message: "Deal option deleted successfully",
      success: true,
      deletedDealOption: result.deletedDealOption,
    });
  } catch (error) {
    console.error("Delete deal option route error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ 
      error: "Failed to delete deal option",
      details: errorMessage
    });
  }
});

export default router;
