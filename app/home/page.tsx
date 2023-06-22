import React from "react";
import { ImageCard } from "@/components";
import { ImageCardProps } from "@/types";
import { posts } from "@/constants";

const Home = () => {
	return (
		<div className="w-full bg-amber-500 min-h-screen fx-center">
			<div className="w-1/3">
				{posts.map((post: ImageCardProps) => (
					<ImageCard
						username={post.username}
						imageURL={post.imageURL}
						caption={post.caption}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
