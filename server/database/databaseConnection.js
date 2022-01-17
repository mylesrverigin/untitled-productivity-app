"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertId = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.MONGO_CONNECTION || '';
const dbName = process.env.DB_NAME || '';
const client = new mongodb_1.MongoClient(mongoUri);
exports.default = async (collectionName) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        return database.collection(collectionName);
    }
    catch (e) {
        console.log('error connecting to DB ', e);
    }
};
const convertId = (id) => {
    return new mongodb_1.ObjectId(id);
};
exports.convertId = convertId;
