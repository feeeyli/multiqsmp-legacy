"use client";

import { CheckSquare, Square } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Streamer } from "./Streamer";
import { Group } from "./Group";
import { useList } from "@/utils/useList";

import { STREAMERS } from "@/data/streamers";
import Link from "next/link";
import { Dialog } from "./Dialog";
import * as Tabs from "@radix-ui/react-tabs";
import * as Separator from "@radix-ui/react-separator";
import { ArrowRightIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { StreamType } from "@/@types/Stream";
import { getChannel } from "@/utils/getStreamUrl";
import { GROUPS } from "@/data/groups";
import { CreateGroup } from "./CreateGroup";
import { useReadLocalStorage } from "usehooks-ts";
import { sortGroups, sortStreamers } from "@/utils/sort";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSearchParams } from "next/navigation";
import { useFlags } from "@/flags/client";

const LANG_GROUPS = ["favela6", "france", "english", "hispanos"];

export const StreamersDialog = ({
	locale,
	selectedChannels,
	selectedGroups: initialSelectedGroups,
}: {
	locale: string;
	selectedChannels: string[];
	selectedGroups: string[];
}) => {
	const t = useTranslations("modal.streamers");
	const [actualTab, setActualTab] = useState("streamers");
	const customGroups = useReadLocalStorage<typeof GROUPS>("customGroups");
	const favoriteStreamers =
		useReadLocalStorage<string[]>("favoriteStreamers");
	const favoriteGroups = useReadLocalStorage<string[]>("favoriteGroups");
	const searchParams = useSearchParams();

	const MERGED_GROUPS = [
		...new Set([...GROUPS, ...((customGroups as typeof GROUPS) || [])]),
	];

	const [onlineStreamers, setOnlineStreamers] = useState<
		{ twitchName: string; isPlayingQsmp: boolean }[]
	>([]);

	const { flags } = useFlags();

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
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_SECRET}`,
						"Client-Id": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
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
	] = useList(selectedChannels);

	const [
		selectedGroups,
		{ updateList: setSelectedGroups, toggleItem: toggleSelectedGroup },
	] = useList(initialSelectedGroups);

	const specialStreamersList =
		process.env.NEXT_PUBLIC_NEW_PARTICIPANTS?.split("/") || [];

	const SPECIAL_STREAMERS = STREAMERS.filter((s) =>
		specialStreamersList.includes(s.twitchName)
	);

	const NO_SPECIAL_STREAMERS = STREAMERS.filter(
		(s) => !specialStreamersList.includes(s.twitchName)
	);

	const FAVORITE_STREAMERS = NO_SPECIAL_STREAMERS.filter((s) =>
		favoriteStreamers?.includes(s.twitchName)
	);
	const NORMAL_STREAMERS = NO_SPECIAL_STREAMERS.filter(
		(s) => !favoriteStreamers?.includes(s.twitchName)
	);

	const FAVORITE_GROUPS = MERGED_GROUPS.filter((g) =>
		favoriteGroups?.includes(g.simpleGroupName)
	);

	const NORMAL_GROUPS = MERGED_GROUPS.filter(
		(g) => !favoriteGroups?.includes(g.simpleGroupName)
	);

	const chatList =
		searchParams.get("chats") === ""
			? []
			: searchParams.get("chats")?.split("/") || [];

	return (
		<Dialog.Root
			onOpenChange={(open) => {
				setSelectedStreamers(selectedChannels);
			}}
		>
			<Dialog.Trigger className="right-0 bottom-0 rounded-tl-lg">
				<UpdateIcon className="w-5 h-5 text-cold-purple-950" />
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>{t("title")}</Dialog.Header>
				<Dialog.Main className="max-h-none">
					<Tabs.Root
						className="w-full"
						defaultValue="streamers"
						onValueChange={(newTab) => setActualTab(newTab)}
						value={actualTab}
					>
						<Tabs.List className="w-full flex justify-center gap-2">
							<Tabs.Trigger
								value="streamers"
								className="p-2 border-b-2 text-sm flex-1 text-center hover:border-b-cold-purple-900 border-b-[#333] data-[state=active]:border-b-cold-purple-500"
							>
								Streamers
							</Tabs.Trigger>
							<Tabs.Trigger
								value="groups"
								className="p-2 border-b-2 text-sm flex-1 text-center hover:border-b-cold-purple-900 border-b-[#333] data-[state=active]:border-b-cold-purple-500"
							>
								{t("groups")}
							</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content
							className="data-[state=inactive]:hidden max-h-96 p-[2px] overflow-y-auto w-full mt-4 flex justify-center flex-row flex-wrap grid-cols-[repeat(2,_minmax(0,_6rem))] sm:grid-cols-[repeat(3,_minmax(0,_8rem))] gap-4 scrollbar pr-3"
							value="streamers"
						>
							{SPECIAL_STREAMERS.length > 0 && (
								<div className="flex w-full items-center gap-2 flex-col">
									<span className="text-cold-purple-500 font-bold">
										{t(
											SPECIAL_STREAMERS.length === 1
												? "newParticipant"
												: "newParticipants"
										)}
									</span>
									<div className="flex flex-wrap gap-4">
										{sortStreamers(SPECIAL_STREAMERS).map(
											(streamer) => {
												const actualStream =
													onlineStreamers.find(
														(online) =>
															online.twitchName.toLocaleLowerCase() ===
															streamer.twitchName.toLocaleLowerCase()
													);

												return (
													<Streamer
														key={
															streamer.twitchName
														}
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
														isOnline={
															!!actualStream
														}
														isPlayingQsmp={
															!!actualStream?.isPlayingQsmp
														}
														isYoutubeStream={/^U/.test(
															getChannel(
																streamer.twitchName
															)
														)}
														isFavorite={favoriteStreamers?.includes(
															streamer.twitchName
														)}
													/>
												);
											}
										)}
									</div>
									<Separator.Root
										className="bg-cold-purple-500/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
										decorative
										orientation="horizontal"
									/>
								</div>
							)}
							{FAVORITE_STREAMERS.length > 0 && (
								<>
									{sortStreamers(FAVORITE_STREAMERS).map(
										(streamer) => {
											const actualStream =
												onlineStreamers.find(
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
													isPlayingQsmp={
														!!actualStream?.isPlayingQsmp
													}
													isYoutubeStream={/^U/.test(
														getChannel(
															streamer.twitchName
														)
													)}
													isFavorite
												/>
											);
										}
									)}
									<Separator.Root
										className="bg-cold-purple-500/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
										decorative
										orientation="horizontal"
									/>
								</>
							)}
							{NORMAL_STREAMERS.map((streamer) => {
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
										isPlayingQsmp={
											!!actualStream?.isPlayingQsmp
										}
										isYoutubeStream={/^U/.test(
											getChannel(streamer.twitchName)
										)}
									/>
								);
							})}
						</Tabs.Content>
						<Tabs.Content
							className="data-[state=inactive]:hidden max-h-96 p-[2px] overflow-y-auto pt-4 w-full flex justify-center flex-row flex-wrap grid-cols-[repeat(2,_minmax(0,_6rem))] sm:grid-cols-[repeat(3,_minmax(0,_8rem))] gap-4 scrollbar pr-3"
							value="groups"
						>
							{FAVORITE_GROUPS.length > 0 && (
								<>
									{sortGroups(FAVORITE_GROUPS).map(
										(group) => {
											return (
												<Group
													key={group.groupName}
													group={group}
													onClick={() =>
														toggleSelectedGroup(
															group.simpleGroupName,
															-1
														)
													}
													selected={selectedGroups.includes(
														group.simpleGroupName
													)}
													isOnline
													isPlayingQsmp
													custom={customGroups?.includes(
														group
													)}
													isFavorite
												/>
											);
										}
									)}
									<Separator.Root
										className="bg-cold-purple-500/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
										decorative
										orientation="horizontal"
									/>
								</>
							)}
							{sortGroups(
								NORMAL_GROUPS.filter((g) =>
									LANG_GROUPS.includes(g.simpleGroupName)
								)
							).map((group) => {
								return (
									<Group
										key={group.groupName}
										group={group}
										onClick={() =>
											toggleSelectedGroup(
												group.simpleGroupName,
												-1
											)
										}
										selected={selectedGroups.includes(
											group.simpleGroupName
										)}
										isOnline
										isPlayingQsmp
									/>
								);
							})}
							<Separator.Root
								className="bg-cold-purple-500/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
								decorative
								orientation="horizontal"
							/>
							{sortGroups(
								NORMAL_GROUPS.filter(
									(g) =>
										!LANG_GROUPS.includes(g.simpleGroupName)
								)
							).map((group) => {
								return (
									<Group
										key={group.groupName}
										group={group}
										onClick={() =>
											toggleSelectedGroup(
												group.simpleGroupName,
												-1
											)
										}
										selected={selectedGroups.includes(
											group.simpleGroupName
										)}
										isOnline
										isPlayingQsmp
									/>
								);
							})}
							{customGroups &&
								customGroups.filter(
									(g) =>
										!favoriteGroups?.includes(
											g.simpleGroupName
										)
								)?.length > 0 && (
									<>
										<Separator.Root
											className="bg-cold-purple-500/20 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px mx-[15px]"
											decorative
											orientation="horizontal"
										/>
										{sortGroups(
											customGroups.filter(
												(g) =>
													!favoriteGroups?.includes(
														g.simpleGroupName
													)
											)
										).map((group) => {
											return (
												<Group
													key={group.groupName}
													group={group}
													onClick={() =>
														toggleSelectedGroup(
															group.simpleGroupName,
															-1
														)
													}
													selected={selectedGroups.includes(
														group.simpleGroupName
													)}
													isOnline
													isPlayingQsmp
													custom
												/>
											);
										})}
									</>
								)}
						</Tabs.Content>
					</Tabs.Root>
				</Dialog.Main>
				<Dialog.Footer className="justify-between">
					<div className="flex gap-2">
						<button
							className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
							onClick={() => {
								if (actualTab === "streamers")
									setSelectedStreamers([]);
								if (actualTab === "groups")
									setSelectedGroups([]);
							}}
						>
							<Square size={18} color="#fff" />
						</button>
						<button
							className="p-2 rounded-md hover:bg-zinc-800 transition-colors"
							onClick={() => {
								if (actualTab === "streamers")
									setSelectedStreamers(
										STREAMERS.map(
											(streamer) => streamer.twitchName
										)
									);

								if (actualTab === "groups")
									setSelectedGroups(
										MERGED_GROUPS.map(
											(streamer) =>
												streamer.simpleGroupName
										)
									);
							}}
						>
							<CheckSquare size={18} color="#fff" />
						</button>
						<CreateGroup
							selectedStreamers={STREAMERS.filter((s) =>
								selectedStreamers.includes(s.twitchName)
							)}
						/>
					</div>
					<DialogClose asChild>
						<Link
							className="flex font-light items-center gap-2 text-cold-purple-500 hover:bg-zinc-800 p-2 px-4 rounded-lg transition-colors"
							href={`?${
								selectedStreamers.length > 0
									? "streamers=" + selectedStreamers.join("/")
									: ""
							}${
								selectedGroups.length > 0
									? "&groups=" + selectedGroups.join("/")
									: ""
							}${
								chatList.length > 0 &&
								(selectedStreamers.length > 0 ||
									selectedGroups.length > 0)
									? "&chats=" + chatList.join("/")
									: ""
							}`}
						>
							{t("watch")} <ArrowRightIcon className="h-4 w-4" />
						</Link>
					</DialogClose>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
