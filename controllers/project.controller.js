import createError from "http-errors";
import Project from "../models/project.model.js";

// GET api/projects
const getAll = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.json({
      success: true,
      message: "Projects list retrieved successfully.",
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};

// GET api/projects/:id
const getById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(createError(404, "Project not found."));
    }
    res.json({
      success: true,
      message: "Project retrieved successfully.",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// POST api/projects
const add = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: "Project added successfully.",
      data: project,
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/projects/:id
const update = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    if (!project) {
      return next(createError(404, "Project not found."));
    }
    res.json({
      success: true,
      message: "Project updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/projects/:id
const remove = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return next(createError(404, "Project not found."));
    }
    res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, add, update, remove };
