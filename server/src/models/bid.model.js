import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    gigId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gig",
      required: true,
      index: true,
    },

    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "hired", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

/**
 * Prevents the same freelancer from bidding
 * multiple times on the same gig
 */
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

export default mongoose.model("Bid", bidSchema);
