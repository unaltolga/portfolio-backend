import createError from "http-errors";
import User from "../models/user.model.js";

// GET api/users
const getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

// GET api/users/:id
const getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found."));
    }
    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// POST api/users
const add = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      message: "User added successfully.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// PUT api/users/:id
const update = async (req, res, next) => {
  try {
    // Keep the creation date, refresh the update date
    const changes = { ...req.body, updated: Date.now() };
    delete changes.created;

    const user = await User.findByIdAndUpdate(req.params.id, changes, {
      runValidators: true,
    });
    if (!user) {
      return next(createError(404, "User not found."));
    }
    res.json({
      success: true,
      message: "User updated successfully.",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE api/users/:id
const remove = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(createError(404, "User not found."));
    }
    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export default { getAll, getById, add, update, remove };
