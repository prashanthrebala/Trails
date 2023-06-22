import React from "react";
import Image from "next/image";
import { ImageCardProps } from "@/types";

const ImageCard = (props: ImageCardProps) => {
	const { username, imageURL, caption } = props;

	return (
		<div className="fx-center flex-col bg-stone-300 sm:mx-16 m-4 rounded-xl">
			<div className="p-3 h-16 fx-center">{username}</div>
			<div className="relative w-full max-w-3xl h-72 lg:h-96">
				<Image
					fill
					src={imageURL}
					alt={caption || ""}
					style={{ objectFit: "cover" }}
				/>
			</div>
			<div className="w-full p-3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque fugit
				labore in, velit illum rem aperiam dolorem eaque fuga, quae repellendus
				omnis incidunt tempore! Odio nobis deleniti ipsam dolore inventore!
			</div>
		</div>
	);
};

export default ImageCard;
