import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as contactRouterMongoDB } from './routes/mongoDB/contactRoutes.js';
import { router as contactRouterPostgreSQL } from './routes/postgreSQL/contactRoutes.js';
import bodyParser from 'body-parser';
import db from './models/postgreSQL/index.js' // Used for sequalize to reset postgreSQL db

dotenv.config();
const app = express();

var corsOptions = {
  // URL for frontend, port: 5173 by default in vite 
  origin: "http://localhost:5173"
};

const port = 5000;
app.use(cors(corsOptions));
app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Get current db context from env file
const dbContext = process.env.DB_CONTEXT;

// Check which db is in use, default to mongodb
if (!!dbContext && dbContext == "postgreSQL") {
  // Used to reset/recreate postgreSQL db
  /*
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
  */
  db.sequelize.sync().then(() => {
    console.log("Created the table");
  });
  app.use('/api/contacts', contactRouterPostgreSQL);
} else {
  // Connect to mongodb
  mongoose.connect('mongodb://localhost:27017/ContactsDB');
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', () => console.log('Connected to Database'));

  app.use('/api/contacts', contactRouterMongoDB);
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
