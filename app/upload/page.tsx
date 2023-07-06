"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import FileUpload from "@/components/FileUpload";
import { validateFileType } from "@/lib/utils";

const InnerUploadForm = () => {
	const [fileBase64, setFileBase64] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState("");
	const router = useRouter();
	const { data: session, status } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/signin?callbackUrl=/upload");
		},
	});

	if (status === "loading") {
		return <h1>Loading</h1>;
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile && validateFileType(selectedFile)) {
			convertFileToBase64(selectedFile);
		}
	};

	const convertFileToBase64 = (file: File): void => {
		const reader = new FileReader();

		reader.onload = () => {
			const base64Data = reader.result as string;
			setFileName(file.name);
			setFileBase64(base64Data);
		};

		reader.onerror = (error) => {
			console.error("Error converting file to base64:", error);
		};

		reader.readAsDataURL(file);
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const description = form.description.value;
		const geoLocation = form.geoLocation.value;
		const file = form.trailImage.files?.[0];

		if (!file || !validateFileType(file)) {
			alert("Please upload a valid image");
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("http://192.168.1.129:3000/api/posts", {
				method: "POST",
				body: JSON.stringify({
					username: "Prashanth Rebala",
					description,
					geoLocation,
					fileName,
					fileBase64,
				}),
			});

			if (response.ok) {
				router.push("/home");
			} else {
				throw new Error("Post request failed");
			}
		} catch (error) {
			console.error("Error performing the POST request:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return !isLoading ? (
		<div className="w-full h-full bg-[#00261C] flex justify-center py-16">
			<form
				className="flex flex-col gap-6 w-96 max-w-6xl m-4"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					name="geoLocation"
					placeholder="Location"
					className="h-12 rounded-xl w-full p-4 box-border outline-none"
					required
				/>
				<FileUpload
					fileBase64={fileBase64}
					fileName={fileName}
					handleFileChange={handleFileChange}
				/>
				<textarea
					name="description"
					placeholder="Description"
					className="h-36 rounded-xl w-full p-4 box-border outline-none resize-none"
				/>
				<button type="submit" className="h-10 w-24 bg-green-600 rounded-full">
					Create
				</button>
			</form>
		</div>
	) : (
		<h1 className="text-neutral-100">LOADING</h1>
	);
};

const UploadForm = () => {
	return (
		<SessionProvider>
			<InnerUploadForm />
		</SessionProvider>
	);
};

export default UploadForm;
