import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongo";
import { DEFAULT_POSTS_PER_LOAD } from "@/constants";

export async function GET(req: NextRequest) {
	const page = parseInt(req.nextUrl.searchParams.get("page") ?? "0");
	const mongoClient = await clientPromise;
	const db = await mongoClient.db("trail");
	const data = await db
		.collection("posts")
		.find()
		.skip(page)
		.limit(DEFAULT_POSTS_PER_LOAD)
		.toArray();

	return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
	const newUploadData = await req.json();
	const { description, username, geoLocation } = newUploadData;
	const { fileBase64, fileName, addCropRatio } = newUploadData;
	const url = process.env.IMAGE_SERVER_URL || "";
	const uploadEndpoint = `${url}/trails/upload`;

	const result = await fetch(uploadEndpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			fileName,
			image64: fileBase64,
		}),
	});

	const data = await result.json();
	console.log(JSON.stringify(data, null, 2));
	const { imageUrl, thumbnailUrl } = data;

	const mongoClient = await clientPromise;
	const db = await mongoClient.db("trail");
	const postedData = await db.collection("posts").insertOne({
		username,
		description,
		location: geoLocation,
		likes: 0,
		imageUrl,
		thumbnailUrl,
		addCropRatio,
	});

	return NextResponse.json({ data: "success" });
}
