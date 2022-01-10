"use strict";
const mongodb_1 = require("mongodb");
const mongoUri = process.env.MONGO_CONNECTION || '';
const dbName = process.env.DB_NAME || '';
const client = new mongodb_1.MongoClient(mongoUri);
const createDatabaseConnection = async (collectionName) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        return database.collection(collectionName);
    }
    catch (e) {
        console.log('error connecting to DB ', e);
    }
};
module.exports = createDatabaseConnection;
