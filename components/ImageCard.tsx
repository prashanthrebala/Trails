import React from "react";
import Image from "next/image";
import { ImageCardProps } from "@/types";

const ImageCard = (props: ImageCardProps) => {
	const { username, imageURL, caption } = props;

	return (
		<div className="fx-center flex-col bg-stone-300 m-4 rounded-xl">
			<div className="h-12 fx-center">{username}</div>
			<div className="relative w-full h-96">
				<Image
					fill
					src={imageURL}
					alt={caption || ""}
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="h-12 fx-center">{caption}</div>
		</div>
	);
};

export default ImageCard;
