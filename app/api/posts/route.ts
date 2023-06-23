import { NextRequest, NextResponse } from "next/server";

import clientPromise from "@/lib/mongo";

export async function GET() {
	const mongoClient = await clientPromise;
	const db = await mongoClient.db("trail");
	const data = await db.collection("posts").find().toArray();
	return NextResponse.json({ data });
}

export async function POST(req: Request) {
	const data = await req.json();
	console.log("YOLO ALL");
	console.log(typeof data.fileBase64);
	const result = await fetch("http://localhost:5109/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			image64: data.fileBase64,
		}),
	});
	console.log("YOLO AGAIN ALL");
	const responseData = await result.json();
	console.log(responseData);
	// console.log(req.method);
	// console.log(req.body);
	return NextResponse.json({ data: "hello world" });

	// try {
	// 	const formData = await req.formData();
	// 	const caption = formData.get("caption");
	// 	const location = formData.get("location");
	// 	const file = formData.get("myImage");

	// 	console.log(caption);
	// 	console.log(location);

	// 	// Handle the data as needed
	// 	// ...

	// 	return NextResponse.json({ data: "hello world" });
	// } catch (error) {
	// 	console.error("Error parsing request body:", error);
	// 	return NextResponse.error();
	// }
}
