import express from "express";
import healthCheck from "../controllers/health.controller";

const router = express.Router();

router.get("/api/health", async (req, res) => {
  await healthCheck(req, res);
});

export default router;
