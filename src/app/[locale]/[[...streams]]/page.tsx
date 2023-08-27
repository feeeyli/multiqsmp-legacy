"use client";

import $ from "jquery";

import STREAMERS from "@/streamers.json";

import { useTranslations } from "next-intl";

import { Dialog } from "@/components/Dialog";
import { useEffect } from "react";

interface Props {
	params: {
		locale: string;
		streams?: string[];
	};
}

export default function Home({ params }: Props) {
	const t = useTranslations("index");

	const streamers = STREAMERS.map((streamer) =>
		streamer.twitchName.toLowerCase()
	);

	const streams = params.streams
		? params.streams.filter((stream) =>
				streamers.includes(stream.toLowerCase())
		  )
		: [];

	function optimize_size(n: number) {
		var height = $(window).innerHeight()! - 16;
		var width = $("#streams").width();

		var best_height = 0;
		var best_width = 0;
		var wrapper_padding = 0;
		for (var per_row = 1; per_row <= n; per_row++) {
			var num_rows = Math.ceil(n / per_row);
			var max_width = Math.floor(width! / per_row) - 4;
			var max_height = Math.floor(height / num_rows) - 4;
			if ((max_width * 9) / 16 < max_height) {
				max_height = (max_width * 9) / 16;
			} else {
				max_width = (max_height * 16) / 9;
			}
			if (max_width > best_width) {
				best_width = max_width;
				best_height = max_height;
				wrapper_padding = (height - num_rows * max_height) / 2;
			}
		}
		$(".stream").height(Math.floor(best_height));
		$(".stream").width(Math.floor(best_width));
		$("#streams").css("padding-top", wrapper_padding);
	}

	useEffect(() => {
		// optimize_size(2);
	}, []);

	const grid = () => {
		if (streams.length >= 2 && streams.length <= 6) return "grid-cols-2";
		if (streams.length >= 7 && streams.length <= 12) return "grid-cols-3";
		if (streams.length >= 13 && streams.length <= 20) return "grid-cols-4";
		if (streams.length >= 21 && streams.length <= 30) return "grid-cols-6";
		if (streams.length >= 31) return "grid-cols-7";
	};

	return (
		<main
			className={
				"h-screen max-h-screen bg-black text-white grid items-center " +
				grid()
			}
		>
			{/* <div className="w-full max-h-screen"> */}
			{streams.map((stream, index) => (
				<iframe
					src={`https://player.twitch.tv/?channel=${stream}&parent=http://localhost:3000/&muted=true`}
					// height="720"
					// width="1280"
					key={index}
					allowFullScreen
					className="h-full w-full "
				/>
			))}
			{/* </div> */}
			<Dialog locale={params.locale} streams={streams} />
		</main>
	);
}
