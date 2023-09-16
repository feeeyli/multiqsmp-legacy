import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import ReactGA from "react-ga4";

export const metadata: Metadata = {
	title: "MultiQSMP",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	ReactGA.initialize(process.env.NEXT_PUBLIC_GA_ID!);

	// ReactGA.send({
	// 	hitType: "pageview",
	// 	page: "/pt",
	// 	title: "Acesso em Português",
	// });
	// ReactGA.send({ hitType: "pageview", page: "/en", title: "Acesso em Inglês" });
	ReactGA.send({ hitType: "pageview", page: window.location.pathname });

	return (
		<html>
			<body className={"min-h-screen h-full overflow-x-hidden"}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
