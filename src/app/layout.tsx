import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

export const metadata: Metadata = {
	title: "MultiQSMP",
};

ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!);

ReactGA.send({
	hitType: "pageview",
	page: "/pt",
	title: "Acesso em Português",
});
ReactGA.send({ hitType: "pageview", page: "/en", title: "Acesso em Inglês" });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html>
			<body className={"min-h-screen h-full overflow-x-hidden"}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
