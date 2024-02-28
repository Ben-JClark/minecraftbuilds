import express from "express";

// Import controllers
import { createUser } from "../controllers/Register.Controller.js";
import { signinUser } from "../controllers/Auth.Controller.js";

const router = express.Router();

router.post("/signup", express.json(), createUser);
router.get("/signin", express.json(), signinUser);

export default router;
