import mongoose from 'mongoose';
import { environment } from "../config/index.js";
import { UserSchema, RoleSchema } from './schemas/index.js';

mongoose.connect(environment.mongo_uri).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB");
    console.log(err);
})

export const getCollection = (collection) => {
    return mongoose.model(collection);
}

const UserModel = mongoose.model('user', UserSchema)
const RoleModel = mongoose.model('role', RoleSchema)

export { UserModel, RoleModel };
export { default as GenericRepository } from "./repository/generic.repository.js";