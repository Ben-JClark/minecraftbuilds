import express from "express";
import { multerInstance } from "../utils/FileOperations.js";

// Import controllers
import { getServers } from "../controllers/MServers.Controller.js";
import { getServerDescription } from "../controllers/MHome.Controller.js";
import { getBases, addBase } from "../controllers/MBases.Controller.js";

const router = express.Router();

/* Minecraft server routes */
router.get("/", getServers);

/* Minecraft server home routes */
router.get("/:serverId/home", getServerDescription);

/* Minecraft server base routes */
router.get("/:serverId/bases", getBases);
router.post("/:serverId/bases", multerInstance.array("image_files", 5), addBase);

export default router;
