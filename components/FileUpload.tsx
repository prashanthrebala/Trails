import React from "react";
import Image from "next/image";
import { MdCloudUpload } from "react-icons/md";

const FileUpload = ({ fileBase64, fileName, handleFileChange }: any) => {
	return (
		<div className="bg-neutral-200 w-full h-22 rounded-lg flex p-2 items-center gap-4">
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
			<label
				htmlFor="trailImage"
				className="cursor-pointer flex items-center flex-grow h-full"
			>
				{fileBase64 ? (
					<div className="w-64 overflow-hidden">
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
	);
};

export default FileUpload;
