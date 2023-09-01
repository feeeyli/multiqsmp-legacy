import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "300", "400"] });

export const metadata: Metadata = {
	title: "MultiQSMP",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={"min-h-screen h-full overflow-x-hidden"}>
				{children}
			</body>
		</html>
	);
}
