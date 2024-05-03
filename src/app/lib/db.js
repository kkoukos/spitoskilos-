import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

// Create a new MongoClient instance with the URI and options
const client = new MongoClient(uri);

// Connect to the client and store the promise
let clientPromise = client.connect();

export default clientPromise;
