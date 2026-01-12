import { Router } from "express";
import authRouter from "./auth.routes.js";
import gigRouter from "./gig.routes.js"
import bidRouter from "./bid.routes.js";
import hiringRouter from "./hiring.route.js";
const router = Router();

router.use("/auth", authRouter);
router.use("/gigs", gigRouter);
router.use("/bids", bidRouter);
router.use("/bids", hiringRouter);


export default router;