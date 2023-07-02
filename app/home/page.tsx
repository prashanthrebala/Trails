import React from "react";
import { ImageCard } from "@/components";
import { ImageCardProps } from "@/types";
import { posts } from "@/constants";

const getPosts = async () => {
	const postApiURL = "http://192.168.1.129:3000/api/posts";
	const response = await fetch(postApiURL, {
		next: { revalidate: 10 },
	});
	const responseData = await response.json();
	const postsData = responseData.data;
	return postsData;
};

const Home = async () => {
	const posts = await getPosts();

	return (
		<div className="w-full bg-amber-500 min-h-screen fx-center">
			<div className="w-full max-w-xl">
				{posts.map((post: ImageCardProps) => (
					<ImageCard
						username={post.username}
						imageUrl={post.imageUrl}
						location={post.location}
						description={post.description}
					/>
				))}
			</div>
		</div>
	);
};

export default Home;
