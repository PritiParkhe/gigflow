import mongoose from "mongoose";
import Bid from "../models/bid.model.js";
import Gig from "../models/gig.model.js";
import { getIO } from "../socket/socket.js"; 

/**
 * Hire a freelancer
 * PATCH /api/bids/:bidId/hire
 * - Transaction safe
 * - Prevents race conditions
 * - Auto-rejects other bids
 */
export const hireFreelancer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { bidId } = req.params;
    const io = getIO(); // Get initialized Socket.io instance

    // 1️ Find the bid
    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Bid not found" });
    }

    // 2️ Atomically assign gig ONLY if still open
    const gig = await Gig.findOneAndUpdate(
      { _id: bid.gigId, status: "open" },
      { status: "assigned" },
      { session, new: true }
    );

    // If gig is null → already assigned by another request
    if (!gig) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Gig already assigned" });
    }

    // 3️ Ownership check
    if (gig.owner.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "You are not authorized to hire for this gig" });
    }

    // 4️ Mark selected bid as hired
    bid.status = "hired";
    await bid.save({ session });

    // 5️ Reject all other bids for this gig
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { $set: { status: "rejected" } },
      { session }
    );

    // 6️⃣ Commit transaction
    await session.commitTransaction();
    session.endSession();

    // 7️ Fetch all rejected bids to notify freelancers

    // Notify hired freelancer
    io.to(bid.freelancerId.toString()).emit("bid:hired", {
      gigId: gig._id,
      message: "You have been hired!",
    });

    // 8. Notify rejected freelancers
    rejectedBids.forEach((b) => {
      io.to(b.freelancerId.toString()).emit("bid:rejected", {
        gigId: gig._id,
        message: "Your bid was rejected",
      });
    });

    return res.status(200).json({
      message: "Freelancer hired successfully",
      hiredBid: bid,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Hire Freelancer Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
