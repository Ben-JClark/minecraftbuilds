import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import { path, __dirname } from "./utils/FileOperations.js";

// sessions
import session from "express-session";
import { sessionOptions } from "./models/Pool.js";

// routes
import authRouter from "./routes/Auth.Routes.js";
import serverRouter from "./routes/MServer.Routes.js";

import { CustomError } from "./utils/CustomError.js";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(morgan("dev"));

const uploadDir = path.join(__dirname, "../../public/images/");
app.use(express.static(uploadDir));

app.use(session(sessionOptions));

app.use("/servers", serverRouter);
app.use("/auth", authRouter);

function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  // Send back a CustomError
  if (err instanceof CustomError) {
    res.status(err.code ?? 500).json({
      feild: err.field,
      message: err.message,
    });
  } else {
    // Something unexpected went wrong, send back a general error
    res.status(500).json({ message: "Something went wrong" });
  }
}

app.use(errorHandler);

app.listen(5000);
