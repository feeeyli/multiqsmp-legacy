import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ChatContextProvider } from "@/contexts/ChatContext";
import { PlayersContextProvider } from "@/contexts/PlayersContext";
import { StreamsAndGroupsContextProvider } from "@/contexts/StreamsAndGroupsContent";

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
			<body className="min-h-screen h-full overflow-x-hidden">
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ChatContextProvider>
						<PlayersContextProvider>
							<StreamsAndGroupsContextProvider>
								{children}
							</StreamsAndGroupsContextProvider>
						</PlayersContextProvider>
					</ChatContextProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
