"use client";

import { CheckSquare, Square } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Streamer } from "./Streamer";
import { useList } from "@/utils/useList";

import { STREAMERS } from "@/streamers";
import Link from "next/link";
import { Dialog } from "./Dialog";
import { ArrowRightIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { StreamType } from "@/@types/Stream";
import { getChannel } from "@/utils/getStreamUrl";

export const StreamersDialog = ({
	locale,
	channels,
}: {
	locale: string;
	channels: string[];
}) => {
	const t = useTranslations("modal.streamers");

	const [onlineStreamers, setOnlineStreamers] = useState<
		{ twitchName: string; isPlayingQsmp: boolean }[]
	>([]);

	useEffect(() => {
		(async () => {
			const twitchStreamers = STREAMERS.filter(
				(streamer) =>
					!["willyrex", "vegetta777"].includes(streamer.twitchName)
			)
				.map((streamer) => `user_login=${streamer.twitchName}`)
				.join("&");

			const response = await fetch(
				"https://api.twitch.tv/helix/streams?" + twitchStreamers,
				{
					headers: {
						Authorization: "Bearer i6889ycv4g9aw5mabc1ozozpelpkwu",
						"Client-Id": "iriodovqpouhcqrdy52cy3b95sv69h",
					},
				}
			);

			const data: { data: StreamType[] } = await response.json();

			setOnlineStreamers(
				data.data.map((stream) => ({
					twitchName: stream.user_login,
					isPlayingQsmp:
						/(qsmp)|(minecraft)/i.test(
							stream.tags?.join(",") || ""
						) || stream.game_name === "Minecraft",
				}))
			);
		})();
	}, []);

	const [
		selectedStreamers,
		{
			updateList: setSelectedStreamers,
			toggleItem: toggleSelectedStreamer,
		},
	] = useList(channels);

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				if (open === false) setSelectedStreamers(channels);
			}}
		>
			<Dialog.Trigger className="right-0 bottom-0 rounded-tl-lg">
				<UpdateIcon className="w-5 h-5 text-cold-purple-950" />
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>{t("title")}</Dialog.Header>
				<Dialog.Main>
					{STREAMERS.map((streamer) => {
						const actualStream = onlineStreamers.find(
							(online) =>
								online.twitchName.toLocaleLowerCase() ===
								streamer.twitchName.toLocaleLowerCase()
						);

						return (
							<Streamer
								key={streamer.twitchName}
								streamer={streamer}
								onClick={() =>
									toggleSelectedStreamer(
										streamer.twitchName,
										-1
									)
								}
								selected={selectedStreamers.includes(
									streamer.twitchName
								)}
								isOnline={!!actualStream}
								isPlayingQsmp={!!actualStream?.isPlayingQsmp}
								isYoutubeStream={/^U/.test(
									getChannel(streamer.twitchName)
								)}
							/>
						);
					})}
				</Dialog.Main>
				<Dialog.Footer className="justify-between">
					<div className="space-x-2">
						<button
							className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
							onClick={() => setSelectedStreamers([])}
						>
							<Square size={18} color="#fff" />
						</button>
						<button
							className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
							onClick={() =>
								setSelectedStreamers(
									STREAMERS.map(
										(streamer) => streamer.twitchName
									)
								)
							}
						>
							<CheckSquare size={18} color="#fff" />
						</button>
					</div>
					<Link
						className="flex font-light items-center gap-2 text-cold-purple-500 hover:bg-zinc-800 p-2 px-4 rounded-lg transition-colors"
						href={`/${locale}/${selectedStreamers.join("/")}`}
					>
						{t("watch")} <ArrowRightIcon className="h-4 w-4" />
					</Link>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
