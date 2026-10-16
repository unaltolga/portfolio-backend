import express from "express";
import userCtrl from "../controllers/user.controller.js";

const router = express.Router();

router.route("/api/users").get(userCtrl.getAll).post(userCtrl.add);

router
  .route("/api/users/:id")
  .get(userCtrl.getById)
  .put(userCtrl.update)
  .delete(userCtrl.remove);

export default router;
