const validateFileType = (file: File): boolean => {
	const allowedFileTypes = ["image/jpeg", "image/png"];
	const fileType = file.type;

	if (!allowedFileTypes.includes(fileType)) {
		alert("Invalid file type. Please select a JPEG or PNG image.");
		return false;
	}

	return true;
};

export { validateFileType };
