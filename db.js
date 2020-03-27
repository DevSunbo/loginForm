import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: true
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("connect to db");
const handleError = (error) => console.log(`error ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);