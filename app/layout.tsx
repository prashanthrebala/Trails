import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components";
import bgImage from "@/public/background/freepik-forest.jpg";

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
			<body
				style={{
					height: "100vh",
					width: "100%",
					backgroundImage: `url(${bgImage.src})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
