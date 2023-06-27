import React from "react";

const Navbar = () => {
	return (
		<div className="w-full h-14 bg-green-600 fx-center">
			<div className="w-20 fx-center">Trails</div>
			<div className="grow fx-center">
				<input className="w-full md:w-1/2 max-w-xl h-10 rounded-full" />
			</div>
			<div className="w-20 fx-center">Profile</div>
		</div>
	);
};

export default Navbar;
