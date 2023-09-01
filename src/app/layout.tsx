import "./globals.css";
import type { Metadata } from "next";

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
