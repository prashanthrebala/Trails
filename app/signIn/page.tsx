"use client";

import { signIn } from "next-auth/react";
import React from "react";

const SignInPage = () => {
	return (
		<div>
			<button onClick={() => signIn()}>Hello, I'm a button</button>
		</div>
	);
};

export default SignInPage;
