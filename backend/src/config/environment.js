import dotenv from 'dotenv';
dotenv.config();

const { MONGO_URI, JWT_KEY } = process.env;

export const environment = {
    mongo_uri: MONGO_URI,
    jwt_key: JWT_KEY
}