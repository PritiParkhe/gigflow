import { Router } from "express";
import authRouter from "./auth.routes.js";
import gigRouter from "./gig.routes.js"
const router = Router();

router.use("/auth", authRouter);
router.use("/gigs", gigRouter)


export default router;