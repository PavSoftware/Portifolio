import { Project } from "../models/index.js";
import { uploadFileToSupabase } from "../services/supabaseService.js";

export const getAllProjects = async (req, res) => {
  try {
    const { isFeatured, type, limit } = req.query;
    const where = {};
    if (isFeatured !== undefined) where.isFeatured = isFeatured === "true";
    if (type) where.type = type;

    const projects = await Project.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit: limit ? parseInt(limit) : undefined,
    });

    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      isFree,
      isFeatured,
      price,
      githubUrl,
      liveUrl,
    } = req.body;

    // Validation
    if (!title || !description || !type) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Title, description and type are required",
        });
    }

    const freeStatus = isFree === "true" || isFree === true;
    if (!freeStatus && (!price || parseFloat(price) <= 0)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Price is required for paid projects",
        });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadFileToSupabase(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        "projects-images",
      );
    }
    
    const projectData = {
      title,
      description,
      type,
      isFree: freeStatus,
      isFeatured: isFeatured === "true" || isFeatured === true,
      price: freeStatus ? 0 : parseFloat(price),
      githubUrl,
      liveUrl,
      imageUrl,
    };

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });

    const {
      title,
      description,
      type,
      isFree,
      isFeatured,
      price,
      githubUrl,
      liveUrl,
    } = req.body;

    const updateData = { ...req.body };

    if (isFree !== undefined) {
      const freeStatus = isFree === "true" || isFree === true;
      updateData.isFree = freeStatus;
      if (freeStatus) updateData.price = 0;
    }

    if (isFeatured !== undefined) {
      updateData.isFeatured = isFeatured === "true" || isFeatured === true;
    }

    if (req.file) {
      updateData.imageUrl = await uploadFileToSupabase(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        "projects-images",
      );
    }

    await project.update(updateData);
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    await project.destroy();
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
