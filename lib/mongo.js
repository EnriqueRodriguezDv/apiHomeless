import { MongoClient, ObjectID } from "mongodb";

import config from "../config/basicConfig";
import customLog from "../utils/console/customLog";

const USER = encodeURIComponent(config.userDB);
const PASSWORD = encodeURIComponent(config.passwordDB);
const DB_NAME = config.nameDB;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.hostDB}/${DB_NAME}?retryWrites=true&w=majority`;

let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connection = await (await client.connect()).db(`${DB_NAME}`);
    customLog.info("connectDB");
  } catch (error) {
    customLog.error("[DB-error]: " + error);
    process.exit(1);
  }

  return connection;
}

async function getAll(collection) {
  const db = await connectDB();
  return await db.collection(collection).find().toArray();
}

async function getOne(collection, id) {
  const db = await connectDB();
  return await db.collection(collection).findOne({ _id: ObjectID(id) });
}

async function createOne(collection, newData) {
  const db = await connectDB();
  return await db.collection(collection).insertOne(newData);
}

async function updateOne(collection, updatedData, id) {
  const db = await connectDB();
  return await db
    .collection(collection)
    .findOneAndUpdate({ _id: ObjectID(id) }, { $set: updatedData });
}

async function deleteOne(collection, id) {
  const db = await connectDB();
  return await db.collection(collection).deleteOne({ _id: ObjectID(id) });
}

export default {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
};
