import mongoose from "mongoose";

export const connectDB = async () => {
    
    try {
       const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}