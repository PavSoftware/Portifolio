import { Testimonial } from '../models/index.js';
import { uploadFileToSupabase } from '../services/supabaseService.js';

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    let avatarUrl = null;
    if (req.file) {
      avatarUrl = await uploadFileToSupabase(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        'testimonials-images'
      );
    }

    const data = {
      ...req.body,
      avatarUrl
    };
    const testimonial = await Testimonial.create(data);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByPk(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Not found' });
    await testimonial.destroy();
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
