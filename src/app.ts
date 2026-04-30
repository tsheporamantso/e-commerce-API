import "dotenv/config";
import morgan from "morgan";
import express from "express";
import { connectDB } from "./db/connectDB";
import { getEnvVariable } from "./utils/env";
import { NotFound } from "./middleware/not-found";
import { errorHandlerMiddleware } from "./middleware/error-handler";
import authRouter from "./routes/authRoute";
import cookieParser from "cookie-parser";
import { limiter } from "./middleware/rate-limiter";
import helmet from "helmet";
import cors from "cors";

const app = express();

const allowedOrigins = "http://localhost:3000";

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

// body parser
app.use(express.json());

// logger
app.use(morgan("tiny"));

// express-rate-limit and helmet
app.use(limiter);
app.use(helmet());

// cookieParser
app.use(cookieParser(process.env.JWT_SECRET));

// routes
app.use("/api/v1/auth", authRouter);

// middleware
app.use(NotFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(getEnvVariable("MONGO_URL"));
    console.log("CONNECTED TO DB");
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
