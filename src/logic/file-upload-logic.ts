import multer from 'multer';
import { Request } from 'express';
import { supabase } from '../config/supabase';
import { v4 as uuidv4 } from 'uuid';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter to only allow PDFs
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Multer configuration
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Upload file to Supabase Storage
export const uploadFileToSupabase = async (
  file: Express.Multer.File,
  userId: string,
  folder?: string
): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // Generate unique filename
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Create path structure: userId/folder/filename or userId/filename
    const filePath = folder 
      ? `${userId}/${folder}/${fileName}`
      : `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('pdf-uploads')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: 'Failed to upload file' };
  }
};

// Get signed URL for accessing uploaded file
export const getSignedUrl = async (
  filePath: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {

    console.log("getting signed url for file: ", filePath)
    console.log("using storage bucket: pdf-uploads")
    console.log("expires in seconds:", expiresIn)

    const { data, error } = await supabase.storage
      .from('pdf-uploads')
      .createSignedUrl(filePath, expiresIn);

    if (error) {
      console.error('Error creating signed URL:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Try to list files to see what's available
      console.log('Attempting to list files in bucket to debug...');
      try {
        const { data: listData, error: listError } = await supabase.storage
          .from('pdf-uploads')
          .list('', { limit: 100 });
        
        if (listError) {
          console.error('Error listing files:', listError);
        } else {
          console.log('Available files in bucket:');
          listData?.forEach(file => console.log(' -', file.name));
        }
      } catch (listErr) {
        console.error('Error during file listing:', listErr);
      }
      
      return { success: false, error: error.message };
    }

    console.log("signed url: ", data.signedUrl)

    return { success: true, url: data.signedUrl };
  } catch (error) {
    console.error('Signed URL error:', error);
    return { success: false, error: 'Failed to create signed URL' };
  }
};

// List user's uploaded files
export const listUserFiles = async (
  userId: string,
  folder?: string
): Promise<{ success: boolean; files?: any[]; error?: string }> => {
  try {
    const prefix = folder ? `${userId}/${folder}/` : `${userId}/`;
    
    const { data, error } = await supabase.storage
      .from('pdf-uploads')
      .list(userId, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      });

    if (error) {
      console.error('Error listing files:', error);
      return { success: false, error: error.message };
    }

    return { success: true, files: data };
  } catch (error) {
    console.error('List files error:', error);
    return { success: false, error: 'Failed to list files' };
  }
};

// Delete file from Supabase Storage
export const deleteFile = async (
  filePath: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.storage
      .from('pdf-uploads')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete file error:', error);
    return { success: false, error: 'Failed to delete file' };
  }
}; 