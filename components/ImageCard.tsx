import React from "react";
import Image from "next/image";
import { ImageCardProps } from "@/types";

const getTransformUrl = (baseUrl: string, addCropRatio?: boolean) => {
	return `${baseUrl}?tr=w-1080${addCropRatio ? ",ar-4-5" : ""}`;
};

const ImageCard = (props: ImageCardProps) => {
	const { username, imageUrl, description } = props;
	const { geoLocation, location, addCropRatio } = props;

	return (
		<div className="fx-center flex-col bg-stone-300 sm:mx-16 m-10 rounded-xl">
			<div className="p-3 h-16 fx-center">{location}</div>
			<Image
				src={getTransformUrl(imageUrl, addCropRatio)}
				alt={description || ""}
				width={0}
				height={0}
				sizes="100vw"
				style={{ width: "100%", height: "auto" }}
			/>
			<div className="p-3 py-6 w-full">
				<span className="font-bold">{username}</span>: {description}
			</div>
		</div>
	);
};

export default ImageCard;
