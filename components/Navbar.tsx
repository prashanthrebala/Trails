import React from "react";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const Navbar = async () => {
	const data = await getServerSession(authOptions);
	const userName = data?.user?.name || "Profile";

	return (
		<div className="w-full h-16 bg-gray-950 text-neutral-100 fx-center">
			<div className="w-20 fx-center">Trails</div>
			<div className="grow fx-center">
				<input
					className="w-full md:w-1/2 max-w-xl h-10 rounded-full outline-none text-neutral-900 px-8"
					placeholder="Search for Trails"
				/>
			</div>
			<div className="w-20 fx-center">{userName}</div>
		</div>
	);
};

export default Navbar;
