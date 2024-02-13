import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
const app: Express = express();
import { getServers, getLongDescription, getBases, addBase } from "./database/Queries.js";
import { multerInstance, path, __dirname } from "./file_operations/FileOperations.js";
import { parseBase } from "./type_operations/BaseOperations.js";
import type { Base } from "./type_operations/BaseOperations.js";

type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

const uploadDir = path.join(__dirname, "../uploads/");
app.use(express.static(uploadDir));

app.get("/", async (req, res) => {
  const response: ServerResponse = await getServers();
  res.status(response.statusCode).json(response);
});

app.get("/server/:serverID/home", async (req, res) => {
  const response: ServerResponse = await getLongDescription(parseInt(req.params.serverID));
  res.status(response.statusCode).json(response); // Send back a response
});

app.get("/server/:serverID/bases", async (req, res) => {
  const response: ServerResponse = await getBases(parseInt(req.params.serverID));
  res.status(response.statusCode).json(response); // Send back a response where response.data has a list of bases
});

app.post("/server/:serverID/bases", multerInstance.array("image_files", 5), async (req, res) => {
  const base: Base = parseBase(parseInt(req.params.serverID), 1, req.body, req.files as Express.Multer.File[]); // Convert the request into a base object
  const response: ServerResponse = await addBase(base); // Insert the base into the MySQL db
  res.status(response.statusCode).json(response); // Send back a response
});

app.listen(5000);

export type { ServerResponse };
