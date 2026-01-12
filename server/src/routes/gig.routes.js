import { Router } from "express";
import {
  createGig,
  browseGigs,
} from "../controllers/gig.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

// Post gig
router.post("/", protect, createGig);

// Browse gigs 
router.get("/", protect, browseGigs);

export default router;
