import express from "express";
import referenceCtrl from "../controllers/reference.controller.js";

const router = express.Router();

router
  .route("/api/references")
  .get(referenceCtrl.getAll)
  .post(referenceCtrl.add);

router
  .route("/api/references/:id")
  .get(referenceCtrl.getById)
  .put(referenceCtrl.update)
  .delete(referenceCtrl.remove);

export default router;
