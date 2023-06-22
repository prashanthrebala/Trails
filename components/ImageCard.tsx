import React from "react";
import Image from "next/image";
import { ImageCardProps } from "@/types";

const ImageCard = (props: ImageCardProps) => {
	const { username, imageURL, caption } = props;

	return (
		<div className="fx-center flex-col bg-stone-300 m-4 rounded-xl">
			<div className="h-12 fx-center">{username}</div>
			<Image width={1080} height={0} src={imageURL} alt={caption || ""} />
			<div className="h-12 fx-center">{caption}</div>
		</div>
	);
};

export default ImageCard;
