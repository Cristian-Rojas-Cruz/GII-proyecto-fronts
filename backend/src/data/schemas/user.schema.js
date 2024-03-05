import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [{ type: Number, ref: 'role' }]
}, { strictPopulate: false });
