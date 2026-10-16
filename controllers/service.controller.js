import createError from "http-errors";
import Service from "../models/service.model.js";

// GET api/services
const getAll = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.json({
      success: true,
      message: "Services list retrieved successfully.",
      data: services,
    });
  } catch (err) {
    next(err);
  }
};

// GET api/services/:id
const getById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(createError(404, "Service not found."));
    }
    res.json({
      success: true,
      message: "Service retrieved successfully.",
      data: service,
    });
  } catch (err) {
    next(err);
  }
};

// POST api/services
const add = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      data: service,
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/services/:id
const update = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    if (!service) {
      return next(createError(404, "Service not found."));
    }
    res.json({
      success: true,
      message: "Service updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/services/:id
const remove = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return next(createError(404, "Service not found."));
    }
    res.json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, add, update, remove };
