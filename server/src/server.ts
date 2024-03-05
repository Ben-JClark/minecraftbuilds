import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import { path, __dirname } from "./utils/FileOperations.js";

// sessions
import session from "express-session";
import { sessionOptions } from "./models/Pool.js";

// routes
import authRouter from "./routes/Auth.Routes.js";
import serverRouter from "./routes/MServer.Routes.js";

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

app.listen(5000);
