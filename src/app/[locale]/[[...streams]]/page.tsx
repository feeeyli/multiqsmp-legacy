import $ from "jquery";

// import STREAMERS from "@/streamers.json";

import { useTranslations } from "next-intl";

import { Dialog } from "@/components/Dialog";
import { useEffect } from "react";
import { Streamer } from "@/components/Streamer";

interface Props {
	params: {
		locale: string;
		streams?: string[];
	};
}

export default async function Home({ params }: Props) {
	const STREAMERS: Streamer[] = await fetch(
		"https://gist.githubusercontent.com/lunafeyli/6ac07afdd349854e8f1c952cde95c75a/raw/daa0c56837587f8b9acb510b5c3e2247e702756c/qsmpstreamers.json"
	).then((a) => a.json());

	const streamers = STREAMERS.map((streamer) =>
		streamer.twitchName.toLowerCase()
	);

	const streams = params.streams
		? params.streams.filter((stream) =>
				streamers.includes(stream.toLowerCase())
		  )
		: [];

	const grid = () => {
		if (streams.length >= 2 && streams.length <= 6) return "grid-cols-2";
		if (streams.length >= 7 && streams.length <= 12) return "grid-cols-3";
		if (streams.length >= 13 && streams.length <= 20) return "grid-cols-4";
		if (streams.length >= 21 && streams.length <= 30) return "grid-cols-6";
		if (streams.length >= 31) return "grid-cols-7";
	};

	const columns = (() => {
		if (streams.length >= 2 && streams.length <= 6) return 2;
		if (streams.length >= 7 && streams.length <= 12) return 3;
		if (streams.length >= 13 && streams.length <= 20) return 4;
		if (streams.length >= 21 && streams.length <= 30) return 6;
		if (streams.length >= 31) return 7;

		return 1;
	})();

	return (
		<main className={"h-screen max-h-screen bg-black text-white w-[100%]"}>
			<div className="flex flex-wrap w-full h-full max-h-screen">
				{streams.map((stream, index) => (
					<iframe
						src={`https://player.twitch.tv/?channel=${stream}&parent=multiqsmp.vercel.app&muted=true`}
						// height="720"
						// width="1280"
						key={index}
						allowFullScreen
						className="flex-grow"
						style={{
							width: `${100 / Math.floor(columns)}%`,
						}}
					/>
				))}
			</div>
			<Dialog
				locale={params.locale}
				streams={streams}
				streamers={STREAMERS}
			/>
		</main>
	);
}
