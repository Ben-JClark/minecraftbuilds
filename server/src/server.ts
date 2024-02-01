import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
const app: Express = express();
import { getServers, getLongDescription, getBases, addBase } from "./database/queries.js";
import type { Base } from "./validation/ValidBase.js";
import type { ValidationResult } from "./validation/TypeValidation.js";

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response) => {
  // Fetch the servers and return it as .json
  console.log("received get request");
  const serverList = await getServers();
  if (serverList !== null) {
    console.log("Sending server list", serverList);
    res.status(200).json(serverList);
  } else {
    console.log("Error sending server list");
    res.status(500).json({ error: "Failed to retreive server list." });
  }
});

app.get("/server/:serverName/:serverID/home", async (req: Request, res: Response) => {
  const description = await getLongDescription(parseInt(req.params.serverID));
  if (description !== null) {
    res.status(200).json(description);
  } else {
    console.log("Error sending server data");
    res.status(500).json({ error: "Failed to retreive server data." });
  }
});

app.get("/server/:serverName/:serverID/bases", async (req: Request, res: Response) => {
  const baseList = await getBases(parseInt(req.params.serverID));
  console.log("Baselist: ", baseList);
  if (baseList !== null) {
    res.status(200).json(baseList);
  } else {
    console.log("Error sending the list of bases");
    res.status(500).json({ error: "Failed to retreive the list of bases." });
  }
});

app.post("/server/:serverName/:serverID/bases", async (req: Request, res: Response) => {
  const base = req.body as Base;
  base.server_id = parseInt(req.params.serverID);
  base.owner_id = 1;

  console.log("base: ", base);
  const response: ValidationResult = await addBase(base);
  res.status(response.statusCode).json(response);
});

app.listen(5000);
