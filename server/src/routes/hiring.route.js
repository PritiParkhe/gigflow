import express from "express";
import { hireFreelancer } from "../controllers/hiring.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// PATCH /api/bids/:bidId/hire
router.patch("/:bidId/hire", protect, hireFreelancer);

export default router;