import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";

/**
 * Submit a bid
 * POST /api/bids
 */
export const submitBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    // Check if gig exist 
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Prevent owner from bidding
    if (gig.owner.toString() === req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot bid on your own gig" });
    }

    // Prevent duplicate bid from same freelancer
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    // Check for existing bid
    if (existingBid) {
      return res
        .status(409)
        .json({ message: "You have already submitted a bid for this gig" });
    }
    // Create bid
    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error("Submit Bid Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get all bids for a gig (OWNER ONLY)
 * GET /api/bids/:gigId
 */
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);

    // Check if gig exist
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    // Only owner can see all bids
    if (gig.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view bids for this gig" });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bids);
  } catch (error) {
    console.error("Get Bids Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

