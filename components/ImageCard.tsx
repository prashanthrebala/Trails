import React from "react";
import Image from "next/image";
import { ImageCardProps } from "@/types";

const ImageCard = (props: ImageCardProps) => {
	const { username, imageUrl, description, geoLocation, location } = props;

	return (
		<div className="fx-center flex-col bg-stone-300 sm:mx-16 m-4 rounded-xl">
			<div className="p-3 h-16 fx-center">{location}</div>
			<div className="relative w-full max-w-3xl h-72 lg:h-96">
				<Image
					fill
					src={imageUrl}
					alt={description || ""}
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="w-full p-3">{description}</div>
		</div>
	);
};

export default ImageCard;
