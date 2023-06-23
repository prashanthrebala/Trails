import { MongoClient } from "mongodb";

const URI = process.env.MONGO_URL;
const options = {};

if (!URI) {
	throw new Error("Specify a mongo url in '.env.local' file");
}

let client = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== "production") {
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	clientPromise = client.connect();
}

export default clientPromise;
