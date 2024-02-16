import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { path, __dirname } from "./file_operations/FileOperations.js";
// import routes
import authRouter from "./routes/Auth.Routes.js";
import serverRouter from "./routes/MServer.Routes.js";

type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));

const uploadDir = path.join(__dirname, "../uploads/");
app.use(express.static(uploadDir));

app.use("/servers", serverRouter);
app.use("/auth", authRouter);

app.listen(5000);

export type { ServerResponse };
