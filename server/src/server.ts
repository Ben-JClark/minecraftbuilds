import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { path, __dirname } from "./file_operations/FileOperations.js";
// import routes
import authRouter from "./routes/Auth.Routes.js";
import serverRouter from "./routes/MServer.Routes.js";

export type ServerResponse = {
  success: boolean;
  statusCode: number;
  data?: any;
  invalidFeild?: string;
  errorMessage?: string;
};

export function makeErrRes(code: number, feild: string | undefined, message: string): ServerResponse {
  let response: ServerResponse;
  if (typeof feild === "undefined") {
    response = { success: false, statusCode: code, errorMessage: message };
  } else {
    response = { success: false, statusCode: code, invalidFeild: feild, errorMessage: message };
  }
  return response;
}

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));

const uploadDir = path.join(__dirname, "../../public/images/");
app.use(express.static(uploadDir));

app.use("/servers", serverRouter);
app.use("/auth", authRouter);

app.listen(5000);
