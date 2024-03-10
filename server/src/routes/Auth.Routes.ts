import express from "express";
import { isAuthenticated, isNotAuthenticated } from "../utils/AuthUtils.js";

// Import controllers
import { createUser } from "../controllers/Register.Controller.js";
import { signinUser, signout } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.post("/signup", express.json(), isNotAuthenticated, createUser);
router.post("/signin", express.json(), isNotAuthenticated, signinUser);
router.delete("/signout", express.json(), isAuthenticated, signout);

export default router;
