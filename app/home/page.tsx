"use client";
import React, { useEffect, useState } from "react";
import { ImageCard } from "@/components";
import { ImageCardProps } from "@/types";
import { posts } from "@/constants";
import ScrollEndComponent from "@/components/ScrollEndComponent";

const getPosts = async (page: number) => {
	const postApiURL = "http://192.168.1.129:3000/api/posts?page=" + page;
	const response = await fetch(postApiURL, {
		next: { revalidate: 10 },
	});
	const responseData = await response.json();
	const postsData = responseData.data;
	return postsData;
};
const Home = () => {
	const [page, setPage] = useState(0);
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const postsResponse = await getPosts(page);
			setPosts([...posts, ...postsResponse] as any);
			console.log("updated");
		};

		fetchData();
	}, [page]);

	return (
		<div className="w-full min-h-screen fx-center bg-[#00000000]">
			<div className="w-full max-w-xl">
				{posts.map((post: ImageCardProps) => (
					<ImageCard
						username={post.username}
						imageUrl={post.imageUrl}
						location={post.location}
						description={post.description}
						addCropRatio={post.addCropRatio}
					/>
				))}
				<ScrollEndComponent setPage={setPage} shouldFetch={posts.length > 0} />
			</div>
		</div>
	);
};

export default Home;
