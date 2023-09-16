"use client";

import { useTranslations } from "next-intl";
import { useList } from "@/utils/useList";

import Link from "next/link";
import { Dialog } from "./Dialog";
import {
	ArrowRightIcon,
	CaretSortIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import { useContext } from "react";
import { ChatContext } from "@/contexts/ChatContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { GROUPS } from "@/data/groups";
import { getStreamersFromGroup } from "@/utils/parseChannels";
import { useReadLocalStorage } from "usehooks-ts";
import { getSkinHead } from "@/utils/getSkinHead";
import { DialogClose } from "@radix-ui/react-dialog";

function getAvatar(name: string) {
	if (name === "tazercraft") return ["mikethelink", "pactw"];

	return [name];
}

export const OrganizeDialog = ({ locale }: { locale: string }) => {
	const t = useTranslations("modal.organize");
	const searchParams = useSearchParams();
	const customGroups = useReadLocalStorage<typeof GROUPS>("customGroups");

	const actualGroups =
		searchParams.get("groups") === ""
			? []
			: searchParams.get("groups")?.split("/") || [];

	const actualChannels =
		searchParams.get("streamers") === ""
			? []
			: searchParams.get("streamers")?.split("/") || [];

	const channelsMerged = [
		...new Set([
			...actualChannels,
			...getStreamersFromGroup(actualGroups, [
				...new Set([...GROUPS, ...(customGroups || [])]),
			]),
		]),
	];

	const [chats, { updateList: setChats, moveItem: moveChat }] =
		useContext(ChatContext);

	const [players, { updateList: setPlayers, moveItem: movePlayer }] =
		useList(channelsMerged);

	return (
		<Dialog.Root
			onOpenChange={() => {
				setPlayers(channelsMerged);
			}}
		>
			<Dialog.Trigger className="left-0 bottom-0 rounded-tr-lg">
				<CaretSortIcon className="w-5 h-5 text-cold-purple-950" />
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>{t("title")}</Dialog.Header>
				<Dialog.Main className="gap-8">
					<section className="flex flex-col items-center gap-2 flex-grow max-w-1/2">
						<h2 className="text-cold-purple-500">Streamers</h2>
						<ul className="space-y-1">
							{players.length === 0 && <li>{t("noStreamer")}</li>}
							{players.length > 0 &&
								players.map((streamer, index) => (
									<li
										key={streamer}
										className="flex items-center justify-between gap-4"
									>
										<div className="rounded-md overflow-hidden">
											<button
												className="px-1 p-2 hover:bg-zinc-800"
												onClick={() =>
													movePlayer(index, "down")
												}
											>
												<ChevronUpIcon className="h-5 w-5" />
											</button>
											<button
												className="px-1 p-2 hover:bg-zinc-800"
												onClick={() =>
													movePlayer(index, "up")
												}
											>
												<ChevronDownIcon className="h-5 w-5" />
											</button>
										</div>
										<span className="font-light flex items-center gap-2">
											{streamer}
											<div className="flex gap-1">
												{getAvatar(streamer).map(
													(avatar) => (
														<Image
															key={streamer}
															alt={avatar}
															src={getSkinHead(
																avatar
															)}
															width={32}
															height={32}
															className="w-6 aspect-square"
														/>
													)
												)}
											</div>
										</span>
									</li>
								))}
						</ul>
					</section>
					<section className="hidden sm:flex flex-col items-center gap-2 flex-grow max-w-1/2">
						<h2 className="text-cold-purple-500">Chats</h2>
						<ul>
							{chats.length === 0 && <li>{t("noChat")}</li>}
							{chats.length > 0 &&
								chats.map((chat, index) => (
									<li
										key={chat}
										className="flex items-center justify-between gap-4"
									>
										<div className="rounded-md overflow-hidden">
											<button
												className="px-1 p-2 hover:bg-zinc-800"
												onClick={() =>
													moveChat(index, "down")
												}
											>
												<ChevronUpIcon className="h-5 w-5" />
											</button>
											<button
												className="px-1 p-2 hover:bg-zinc-800"
												onClick={() =>
													moveChat(index, "up")
												}
											>
												<ChevronDownIcon className="h-5 w-5" />
											</button>
										</div>
										<span className="font-light flex items-center gap-2">
											{chat}
											<div className="flex gap-1">
												{getAvatar(chat).map(
													(avatar) => (
														<Image
															key={chat}
															alt={avatar}
															src={getSkinHead(
																avatar
															)}
															width={32}
															height={32}
															className="w-6 aspect-square"
														/>
													)
												)}
											</div>
										</span>
									</li>
								))}
						</ul>
					</section>
				</Dialog.Main>
				<Dialog.Footer className="justify-end">
					<DialogClose asChild>
						<Link
							className="flex font-light items-center gap-2 text-cold-purple-500 hover:bg-zinc-800 p-2 px-4 rounded-lg transition-colors"
							href={`?${
								players.length > 0
									? "streamers=" + players.join("/")
									: ""
							}${
								actualGroups.length > 0
									? "&groups=" + actualGroups.join("/")
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
