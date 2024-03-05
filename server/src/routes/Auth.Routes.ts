import express from "express";
import { isAuthenticated } from "../utils/AuthUtils.js";

// Import controllers
import { createUser } from "../controllers/Register.Controller.js";
import { signinUser, signout } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.post("/signup", express.json(), createUser);
router.post("/signin", express.json(), signinUser);
router.delete("/signout", express.json(), isAuthenticated, signout);

export default router;
