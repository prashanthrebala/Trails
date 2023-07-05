"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const SignInPage = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") ?? "/";

	return (
		<div className="w-full h-full fx-center">
			<button
				className="bg-[#de5246] fx-center w-72 h-12 rounded-md"
				onClick={() => signIn("google", { callbackUrl })}
			>
				Sign in with Google
			</button>
		</div>
	);
};

export default SignInPage;
