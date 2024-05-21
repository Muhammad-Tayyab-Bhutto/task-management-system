import mongoose from "mongoose";
import { DBNAME } from "../constants.js";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODBURI}/${DBNAME}`)
        
        console.log("MongoDB connected! Host: " + connectionInstance.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;