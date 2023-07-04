import Image from "next/image";
import NextAuthSessionProvider from "./providers/sessionProvider";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<NextAuthSessionProvider>Root page</NextAuthSessionProvider>
		</main>
	);
}
