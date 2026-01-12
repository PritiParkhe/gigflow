import express from "express";
import { submitBid, getBidsForGig } from "../controllers/bid.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, submitBid);
router.get("/:gigId", protect, getBidsForGig);

export default router;