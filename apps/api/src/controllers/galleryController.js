import { Gallery } from '../models/index.js';

export const getGallery = async (req, res) => {
  try {
    const images = await Gallery.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: images });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No image uploaded' });
    
    const image = await Gallery.create({
      imageUrl: `/uploads/${req.file.filename}`,
      caption: req.body.caption
    });
    res.status(201).json({ success: true, data: image });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByPk(req.params.id);
    if (!image) return res.status(404).json({ success: false, message: 'Image not found' });
    await image.destroy();
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
