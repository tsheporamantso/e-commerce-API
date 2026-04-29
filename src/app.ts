import "dotenv/config";
import express from "express";
import { connectDB } from "./db/connectDB";
import { getEnvVariable } from "./utils/env";

const app = express();

const port = process.env.PORT || 5000;

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
