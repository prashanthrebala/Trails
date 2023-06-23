"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";

const UploadForm: React.FC = () => {
	const [fileBase64, setFileBase64] = useState("");

	const validateFileType = (file: File): boolean => {
		const allowedFileTypes = ["image/jpeg", "image/png"];
		const fileType = file.type;

		if (!allowedFileTypes.includes(fileType)) {
			console.log("Invalid file type. Please select a JPEG or PNG image.");
			return false;
		}

		return true;
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const selectedFile = e.target.files?.[0];

		if (selectedFile && validateFileType(selectedFile)) {
			// File is valid, proceed with handling the file
			console.log("File is valid:", selectedFile);
			convertFileToBase64(selectedFile);
		}
	};

	const convertFileToBase64 = (file: File): void => {
		const reader = new FileReader();

		reader.onload = () => {
			const base64Data = reader.result as string;
			console.log("File converted to base64:", base64Data);

			// Use the base64Data as needed (e.g., include it in the form data)
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
		const caption = form.caption.value;
		const geoLocation = form.geoLocation.value;
		const file = form.myImage.files?.[0];

		if (!file || !validateFileType(file)) {
			console.log("Invalid file.");
			return;
		}

		// Convert the file to base64 before appending it to the form data
		const reader = new FileReader();

		reader.onload = () => {
			const base64Data = reader.result as string;

			// Prepare the form data
			const formData = new FormData();
			formData.append("caption", caption);
			formData.append("geoLocation", geoLocation);
			// formData.append("myImage", base64Data);

			// Perform the POST request using fetch
			fetch("http://localhost:3000/api/posts", {
				method: "POST",
				body: JSON.stringify({
					caption,
					geoLocation,
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
				})
				.catch((error) => {
					console.error("Error performing the POST request:", error);
				});
		};

		reader.onerror = (error) => {
			console.error("Error converting file to base64:", error);
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className="w-full min-h-screen bg-blue-700 fx-center">
			<form className="fx-center flex-col gap-6" onSubmit={handleSubmit}>
				<input type="text" name="caption" />
				<input type="text" name="geoLocation" />
				<input
					type="file"
					name="myImage"
					accept="image/*"
					onChange={handleFileChange}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default UploadForm;
