"use client";

import { CheckSquare, Square } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Streamer } from "./Streamer";
import { useList } from "@/utils/useList";

import STREAMERS from "@/streamers.json";
import Link from "next/link";
import { Dialog } from "./Dialog";
import { ArrowRightIcon, UpdateIcon } from "@radix-ui/react-icons";

export const StreamersDialog = ({
	locale,
	channels,
}: {
	locale: string;
	channels: string[];
}) => {
	const t = useTranslations("modal.streamers");

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
					{STREAMERS.map((streamer) => (
						<Streamer
							key={streamer.twitchName}
							streamer={streamer}
							onClick={() =>
								toggleSelectedStreamer(streamer.twitchName, -1)
							}
							selected={selectedStreamers.includes(
								streamer.twitchName
							)}
						/>
					))}
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
