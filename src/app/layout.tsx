import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const GA_ID = "G-P0V7XD4TFG";

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
			{/* <Script id="google-tag-manager" strategy="afterInteractive">
				{`
					(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','G-P0V7XD4TFG');
					`}
			</Script> */}
			<head>
				<Script
					async
					src={`https://www.googletagmanager.com/gtag/js? 
					id=${GA_ID}`}
				></Script>
				<Script
					id="google-analytics"
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', '${GA_ID}');
						`,
					}}
				></Script>
				<meta
					name="google-site-verification"
					content="QQVNDnqV_O0kGHcKhluDoGXKAkDTTP3UcMJzVhoMadQ"
				/>
			</head>
			<body className={"min-h-screen h-full overflow-x-hidden"}>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
