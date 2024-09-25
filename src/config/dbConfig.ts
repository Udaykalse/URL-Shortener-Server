import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
    throw new Error("MongoDB connection string is not defined in environment variables");
}

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(connectionString);
        
        console.log(`MongoDB connected successfully: ${connection.connection.host}, DB Name: ${connection.connection.name}`);
        console.log("Database connection successful");
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDb;
