import React from "react";
import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { AiOutlinePlus } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const Navbar = async () => {
	const data = await getServerSession(authOptions);
	const userName = data?.user?.name || "Profile";

	return (
		<div className="w-full h-16 bg-gray-950 text-neutral-100 fx-center">
			<Link className="h-full w-20" href={"/home"}>
				<div className="h-full w-full fx-center">Trails</div>
			</Link>
			<div className="h-full w-12" />
			<div className="grow fx-center">
				<input
					className="w-full md:w-1/2 max-w-xl h-10 rounded-full outline-none text-neutral-900 px-8"
					placeholder="Search for Trails"
				/>
			</div>
			<Link className="h-full w-16" href={"/upload"}>
				<div className="h-full w-full fx-center">
					<AiOutlinePlus size={30} />
				</div>
			</Link>
			<div className="w-16 fx-center">
				<CgProfile size={30} />
			</div>
		</div>
	);
};

export default Navbar;
