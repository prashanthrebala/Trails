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
			<body className="h-screen w-full flex flex-col">
				<Navbar />
				<div
					className="overflow-y-auto w-full h-full bg-cover bg-center"
					style={{
						backgroundImage: `url(${bgImage.src})`,
					}}
				>
					{children}
				</div>
			</body>
		</html>
	);
}
