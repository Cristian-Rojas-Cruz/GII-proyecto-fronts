import mongoose from "mongoose";

export const RoleSchema = new mongoose.Schema({
    _id: Number,
    name: String,
});
