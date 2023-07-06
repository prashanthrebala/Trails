import { Oxygen } from "next/font/google";
const inter = Oxygen({ weight: "700", subsets: ["latin"] });

export default function Home() {
	return (
		<div className="w-full h-full flex items-center">
			<div
				className={`leading-10 px-4 lg:ml-32 w-full lg:w-1/2 lg:h-1/2 text-zinc-100 text-4xl lg:text-6xl flex items-center ${inter.className}`}
			>
				Uncover popular tourist attractions to visit from your next travel
				destination
			</div>
		</div>
	);
}
