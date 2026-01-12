import Gig from "../models/gig.model.js";

/**
 * Create a new Gig
 * POST /api/gigs
 */
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ EDGE CASE: Prevent duplicate OPEN gig by same user
    const existingGig = await Gig.findOne({
      owner: req.user._id,
      title: title.trim(),
      status: "open",
    });

    if (existingGig) {
      return res.status(409).json({
        message: "You already have an open gig with the same title",
      });
    }

    const gig = await Gig.create({
      title: title.trim(),
      description,
      budget,
      owner: req.user._id,
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error("Create Gig Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Browse all OPEN gigs (with optional search)
 * GET /api/gigs
 */
export const browseGigs = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {
      status: "open",
      ...(search && {
        title: { $regex: search, $options: "i" },
      }),
    };

    const gigs = await Gig.find(filter)
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(gigs);
  } catch (error) {
    console.error("Browse Gigs Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
