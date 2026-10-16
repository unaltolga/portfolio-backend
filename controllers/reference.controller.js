import createError from "http-errors";
import Reference from "../models/reference.model.js";

// GET api/references
const getAll = async (req, res, next) => {
  try {
    const references = await Reference.find();
    res.json({
      success: true,
      message: "References list retrieved successfully.",
      data: references,
    });
  } catch (err) {
    next(err);
  }
};

// GET api/references/:id
const getById = async (req, res, next) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) {
      return next(createError(404, "Reference not found."));
    }
    res.json({
      success: true,
      message: "Reference retrieved successfully.",
      data: reference,
    });
  } catch (err) {
    next(err);
  }
};

// POST api/references
const add = async (req, res, next) => {
  try {
    const reference = await Reference.create(req.body);
    res.status(201).json({
      success: true,
      message: "Reference added successfully.",
      data: reference,
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/references/:id
const update = async (req, res, next) => {
  try {
    const reference = await Reference.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true }
    );
    if (!reference) {
      return next(createError(404, "Reference not found."));
    }
    res.json({
      success: true,
      message: "Reference updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/references/:id
const remove = async (req, res, next) => {
  try {
    const reference = await Reference.findByIdAndDelete(req.params.id);
    if (!reference) {
      return next(createError(404, "Reference not found."));
    }
    res.json({
      success: true,
      message: "Reference deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, add, update, remove };
