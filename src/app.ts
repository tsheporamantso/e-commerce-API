import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { connectDB } from "./db/connectDB";
import { getEnvVariable } from "./utils/env";
import authRouter from "./routes/authRoute";
import userRouter from "./routes/userRoutes";
import productsRouter from "./routes/productRoutes";
import reviewsRouter from "./routes/reviewRoute";
import cookieParser from "cookie-parser";
import { limiter } from "./middleware/rate-limiter";
import { NotFound } from "./middleware/not-found";
import fileUpload from "express-fileupload";
import { errorHandlerMiddleware } from "./middleware/error-handler";

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

// static folder
app.use(express.static("./public"));

app.use(fileUpload());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/reviews", reviewsRouter);

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
