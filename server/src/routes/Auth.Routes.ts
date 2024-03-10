import express from "express";
import { isAuthenticated, isNotAuthenticated } from "../utils/AuthUtils.js";

// Import controllers
import { createUser } from "../controllers/Register.Controller.js";
import { signinUser, signout, checkAuth } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.get("/check", express.json(), checkAuth); // Route to check if the user is authenticated
router.post("/signup", express.json(), isNotAuthenticated, createUser);
router.post("/signin", express.json(), isNotAuthenticated, signinUser);
router.delete("/signout", express.json(), isAuthenticated, signout);

export default router;
