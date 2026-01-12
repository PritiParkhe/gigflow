import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
/**
 * Hire a freelancer
 * PATCH /api/bids/:bidId/hire
 * auto-rejects all other bids
 */
export const hireFreelancer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Bid not found" });
    }

    // 1. Verify that the requester is the gig owner
    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Gig not found" });
    }

    // Check ownership
    if (gig.owner.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      return res
        .status(403)
        .json({ message: "You are not authorized to hire for this gig" });
    }

    // Check if gig is already assigned
    if (gig.status === "assigned") {
      await session.abortTransaction();
      return res.status(400).json({ message: "Gig is already assigned" });
    }

    // 3. Update gig status to 'assigned'
    gig.status = "assigned";
    await gig.save({ session });

    // 4. Update bid status to 'hired'
    bid.status = "hired";
    await bid.save({ session });

    // 5. Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { $set: { status: "rejected" } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Freelancer hired successfully",
      bid,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Hire Freelancer Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
