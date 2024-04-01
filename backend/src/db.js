

import mongoose from "mongoose";
import { router as contactRouterMongoDB } from "./routes/mongoDB/contactRoutes.js";
import { router as contactRouterPostgreSQL } from "./routes/postgreSQL/contactRoutes.js";
import db from "./models/postgreSQL/index.js"; // Used for sequalize to reset postgreSQL db

const connectDB = (app) => {

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
        app.use("/api/contacts", contactRouterPostgreSQL);
    } else {
        const options = {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
        };

        const connectWithRetry = () => {
            mongoose.Promise = global.Promise;
            const uri = "mongodb://mongodb:27017/ContactsDB"; //process.env.MONGODB_URI;
            console.log("MongoDB connection with retry");
            mongoose.connect(uri, options)
                .then(() => {
                    console.log("MongoDB is connected");
                    app.emit("ready");
                })
                .catch((err) => {
                    console.log("MongoDB connection unsuccessful, retry after 2 seconds.", err);
                    setTimeout(connectWithRetry, 2000);
                });
        };
        connectWithRetry();

        app.use("/api/contacts", contactRouterMongoDB);
    }
}

export default connectDB;