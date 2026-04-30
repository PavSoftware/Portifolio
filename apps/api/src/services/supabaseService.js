import { supabase } from '../config/supabase.js';

/**
 * Uploads a file buffer to Supabase Storage and returns the public URL.
 * 
 * @param {Buffer} buffer - The file buffer from multer memoryStorage
 * @param {string} originalName - Original filename to extract extension
 * @param {string} mimeType - MIME type of the file
 * @param {string} bucket - The Supabase bucket name (e.g., 'projects', 'gallery')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFileToSupabase = async (buffer, originalName, mimeType, bucket = 'portfolio') => {
  try {
    if (!buffer) throw new Error('File buffer is required');
    
    const fileExt = originalName.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = fileName; // We can add subfolders here if needed

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: mimeType,
        upsert: false
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Upload failed: ${error.message}`);
  }
};

/**
 * Deletes a file from Supabase Storage using its public URL.
 * 
 * @param {string} publicUrl - The full public URL of the file
 * @param {string} bucket - The Supabase bucket name
 */
export const deleteFileFromSupabase = async (publicUrl, bucket = 'portfolio') => {
  try {
    if (!publicUrl) return;
    
    // Extract file path from URL
    // Public URL format: https://[project-id].supabase.co/storage/v1/object/public/[bucket]/[file-path]
    const urlParts = publicUrl.split('/');
    const filePath = urlParts[urlParts.length - 1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Supabase delete error:', error);
    // We don't necessarily want to fail the whole request if deletion fails
  }
};
