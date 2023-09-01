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
import { PlayersContext } from "@/contexts/PlayersContext";
import { ChatContext } from "@/contexts/ChatContext";

export const OrganizeDialog = ({ locale }: { locale: string }) => {
	const t = useTranslations("modal.organize");

	const [PLAYERS] = useContext(PlayersContext);
	const [chats, { updateList: setChats, moveItem: moveChat }] =
		useContext(ChatContext);

	const [players, { updateList: setPlayers, moveItem: movePlayer }] =
		useList(PLAYERS);

	return (
		<Dialog.Root
			onOpenChange={() => {
				setPlayers(PLAYERS);
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
										<span className="font-light">
											{streamer}
										</span>
									</li>
								))}
						</ul>
					</section>
					<section className="flex flex-col items-center gap-2 flex-grow max-w-1/2">
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
										<span className="font-light">
											{chat}
										</span>
									</li>
								))}
						</ul>
					</section>
				</Dialog.Main>
				<Dialog.Footer className="justify-end">
					<Link
						className="flex font-light items-center gap-2 text-cold-purple-500 hover:bg-zinc-800 p-2 px-4 rounded-lg transition-colors"
						href={`/${locale}/${players.join("/")}`}
					>
						{t("watch")} <ArrowRightIcon className="h-4 w-4" />
					</Link>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	);
};
