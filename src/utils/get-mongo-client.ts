import { MongoClient } from "mongodb";

export default function getMongoClient(options: any) {
  const { DB_CONNECTION_STRING } = options;
  return new MongoClient(DB_CONNECTION_STRING);
}
