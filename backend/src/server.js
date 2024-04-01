import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swagger from "../swaggerConfig.js";
import connectDB from "./db.js";

dotenv.config();
const app = express();

var corsOptions = {
  // URL for frontend, port: 5173 by default in vite
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
};

// Backend server port
const port = process.env.PORT || 5000;
app.use(cors(corsOptions));
app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Build swagger api's
swagger(app, port);

// Connect to database
connectDB(app);

// Listen for frontend api request
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
