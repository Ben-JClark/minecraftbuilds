import express from "express";

// Import controllers
import { createUser } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.post("/signup", express.json(), createUser);

export default router;
