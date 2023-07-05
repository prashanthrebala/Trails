"use client";

import React from "react";
import SessionContext from "@/contexts/SessionContext";
import UploadForm from "./[uploadPage]";

const ProtectedUploadPage = () => {
	return (
		<SessionContext>
			<UploadForm />
		</SessionContext>
	);
};

export default ProtectedUploadPage;
