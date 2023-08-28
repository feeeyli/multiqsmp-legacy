"use client";

import $ from "jquery";

import STREAMERS from "@/streamers.json";

import { useTranslations } from "next-intl";

import { Dialog } from "@/components/Dialog";
import { useEffect } from "react";
import { Streamer } from "@/components/Streamer";
import { TwitchPlayer } from "react-twitch-embed";
import { Player } from "@/components/Player";

interface Props {
	params: {
		locale: string;
		streams?: string[];
	};
}

export default function Streams({ params }: Props) {
	// const STREAMERS: Streamer[] = (await import("@/streamers.json")).default;

	const t = useTranslations("index");

	const streamers = STREAMERS.map((streamer) =>
		streamer.twitchName.toLowerCase()
	);

	const streams = params.streams
		? params.streams.filter((stream) =>
				streamers.includes(stream.toLowerCase())
		  )
		: [];

	const columns = (() => {
		if (streams.length >= 2 && streams.length <= 6) return 2;
		if (streams.length >= 7 && streams.length <= 12) return 3;
		if (streams.length >= 13 && streams.length <= 20) return 4;
		if (streams.length >= 21 && streams.length <= 30) return 6;
		if (streams.length >= 31) return 7;

		return 1;
	})();

	return (
		<main
			className={
				"h-screen max-h-screen bg-cold-purple-950 text-white w-[100%]"
			}
		>
			<div className="flex flex-wrap w-full h-full max-h-screen">
				{streams.map((stream, index) => (
					// <iframe
					// 	src={`https://player.twitch.tv/?channel=${stream}&parent=multiqsmp.vercel.app&muted=true`}
					// 	// height="720"
					// 	// width="1280"
					// 	key={index}
					// 	allowFullScreen
					// 	className="flex-grow"
					// 	style={{
					// 		width: `${100 / Math.floor(columns)}%`,
					// 	}}
					// />
					<Player
						channel={stream}
						key={index}
						columns={columns}
						id={index}
					/>
				))}
				{streams.length === 0 && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm">
						<span className="sm:hidden block text-center">
							{t("noStreamers")} {t("instructionsMobile")}
						</span>
						<span className="hidden sm:block text-center">
							{t("noStreamers")} {t("instructionsPc")}
						</span>
					</div>
				)}
			</div>
			<Dialog
				locale={params.locale}
				streams={streams}
				streamers={STREAMERS}
			/>
		</main>
	);
}
