"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdCloudUpload } from "react-icons/md";

const UploadForm: React.FC = () => {
	const [fileBase64, setFileBase64] = useState("");
	const [fileName, setFileName] = useState("");
	const router = useRouter();

	const validateFileType = (file: File): boolean => {
		const allowedFileTypes = ["image/jpeg", "image/png"];
		const fileType = file.type;

		if (!allowedFileTypes.includes(fileType)) {
			alert("Invalid file type. Please select a JPEG or PNG image.");
			return false;
		}

		return true;
	};

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
		// const username = form.username.value;
		const description = form.description.value;
		const geoLocation = form.geoLocation.value;
		const file = form.trailImage.files?.[0];

		if (!file || !validateFileType(file)) {
			alert("Please upload a valid image");
			return;
		}

		fetch("http://192.168.1.129:3000/api/posts", {
			method: "POST",
			body: JSON.stringify({
				username: "Prashanth Rebala",
				description,
				geoLocation,
				fileName,
				fileBase64,
			}),
		})
			.then((response) => {
				if (response.ok) {
					console.log("Post request successful");
					return response.json();
				} else {
					console.log("Post request failed");
					throw new Error("Post request failed");
				}
			})
			.then((responseData) => {
				console.log("Response data:", responseData);
				router.push("/");
			})
			.catch((error) => {
				console.error("Error performing the POST request:", error);
			});
	};

	return (
		<div className="w-full min-h-screen bg-[#00261C] flex justify-center py-16">
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
				<div className="bg-neutral-200 w-full h-22 rounded-lg flex p-2 items-center gap-4">
					{/* { ( */}
					<div className="border border-neutral-900 rounded-lg h-20 w-20 relative fx-center text-center text-xs">
						{fileBase64 ? (
							<Image
								src={fileBase64}
								className="object-contain rounded-lg"
								alt="image"
								fill
							/>
						) : (
							"No image selected"
						)}
					</div>
					{/* )} */}
					<label
						htmlFor="trailImage"
						className="cursor-pointer flex items-center flex-grow h-full"
					>
						{fileBase64 ? (
							<div>
								{fileName}
								<br />
								<div className="text-xs">Click to pick a different image</div>
							</div>
						) : (
							<div className="flex gap-2">
								<MdCloudUpload size={25} />
								Upload an image
							</div>
						)}
					</label>
					<input
						id="trailImage"
						type="file"
						name="trailImage"
						accept="image/*"
						onChange={handleFileChange}
					/>
				</div>
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
	);
};

export default UploadForm;
