import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Trails",
	description: "Share your favourite spots from your travel diaries",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
