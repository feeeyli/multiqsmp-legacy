import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
	title: "MultiQSMP",
};

export function generateStaticParams() {
	return [
		{ locale: "pt" },
		{ locale: "es" },
		{ locale: "en" },
		{ locale: "fr" },
	];
}

export default async function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	let messages;

	try {
		messages = (await import(`@/messages/${locale}.json`)).default;
	} catch (error) {
		notFound();
	}

	return (
		<html lang={locale}>
			<body
				className={
					poppins.className + " min-h-screen h-full overflow-x-hidden"
				}
			>
				<NextIntlClientProvider locale={locale} messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
