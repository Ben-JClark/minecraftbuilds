import express from "express";

// Import controllers
import { signupUser } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.post("/signup", express.json(), signupUser);

export default router;
