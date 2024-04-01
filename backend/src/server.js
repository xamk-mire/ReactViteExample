import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import swagger from "../swaggerConfig.js";

dotenv.config();
const app = express();

// Connect to database
connectDB(app);

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

// Listen for frontend api request
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
