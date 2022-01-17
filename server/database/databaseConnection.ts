import { MongoClient, ObjectId } from 'mongodb'

const mongoUri:string = process.env.MONGO_CONNECTION || '';
const dbName:string = process.env.DB_NAME || '';
const client = new MongoClient(mongoUri);

export default async (collectionName:string) => {
    try {
        await client.connect();
        const database = client.db(dbName);
        return database.collection(collectionName);
    } catch (e:any) {
        console.log('error connecting to DB ',e);
    }
}

export const convertId = (id:string):ObjectId => {
    return new ObjectId(id);
}
