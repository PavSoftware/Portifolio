import { Project, Gallery, Testimonial } from '../models/index.js';

export const getStats = async (req, res) => {
  try {
    const totalProjects = await Project.count();
    const featuredProjects = await Project.count({ where: { isFeatured: true } });
    const freeProjects = await Project.count({ where: { isFree: true } });
    const paidProjects = totalProjects - freeProjects;
    
    const totalGallery = await Gallery.count();
    const totalTestimonials = await Testimonial.count();

    const recentProjects = await Project.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalProjects,
          featuredProjects,
          freeProjects,
          paidProjects,
          totalGallery,
          totalTestimonials
        },
        recentProjects
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
