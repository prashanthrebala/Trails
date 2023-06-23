import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";

export async function GET() {
	const mongoClient = await clientPromise;
	const db = await mongoClient.db("trail");
	const data = await db.collection("posts").find().toArray();
	return NextResponse.json({ data });
}
