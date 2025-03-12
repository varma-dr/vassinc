import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
    name: String,
    email: String,
});

const candidateModel = mongoose.model("candidate", candidateSchema);
    
export default candidateModel
    