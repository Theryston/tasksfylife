import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: any;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options as any);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
