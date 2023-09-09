"use client";

import { StreamersDialog } from "@/components/StreamersDialog";
import { Player } from "@/components/Player";
import { Chats } from "@/components/Chats";

import { parseChannels } from "@/utils/parseChannels";
import { useTranslations } from "next-intl";
import { getColumns } from "@/utils/getColumns";
import { useContext, useEffect, useState } from "react";
import { PlayersContext } from "@/contexts/PlayersContext";
import { OrganizeDialog } from "@/components/OrganizeDialog";
import { getChannel } from "@/utils/getStreamUrl";

import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ChatContext } from "@/contexts/ChatContext";
import { useMediaQuery } from "@uidotdev/usehooks";
import { TooltipProvider } from "@radix-ui/react-tooltip";

interface Props {
	params: {
		locale: string;
		streams?: string[];
	};
}

export default function Streams({ params }: Props) {
	const channels = parseChannels(params.streams || []);

	const [resizing, setResizing] = useState(false);

	const [, { updateList }] = useContext(PlayersContext);
	const [chatList] = useContext(ChatContext);

	useEffect(() => {
		updateList(channels);
	}, []);

	const t = useTranslations("index");

	const isDesktop = useMediaQuery("(min-width: 640px)");

	const columns = getColumns(channels.length, isDesktop);

	return (
		<TooltipProvider>
			<main
				className={
					"h-screen max-h-screen bg-cold-purple-950 text-white w-[100%] flex pb-6 relative"
				}
			>
				{isDesktop}
				<PanelGroup direction={isDesktop ? "horizontal" : "vertical"}>
					<Panel minSize={35} defaultSize={100}>
						<div
							data-resizing={resizing}
							className="flex flex-wrap h-full max-h-screen flex-1 data-[resizing=true]:pointer-events-none"
						>
							{channels.map((channel) => (
								<Player
									channel={channel}
									key={channel}
									columns={columns}
									id={channel}
									isYoutubeStream={/^U/.test(
										getChannel(channel)
									)}
								/>
							))}
							{channels.length === 0 && (
								<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm">
									<span className="sm:hidden block text-center">
										{t("noStreamers")}{" "}
										{t("instructionsMobile")}
									</span>
									<span className="hidden sm:block text-center">
										{t("noStreamers")} {t("instructionsPc")}
									</span>
								</div>
							)}
						</div>
					</Panel>
					{chatList.length > 0 && (
						<>
							<PanelResizeHandle
								onDragging={(dragging) => setResizing(dragging)}
								className="p-2 before:block relative before:bg-cold-purple-300 before:opacity-50 hover:before:opacity-70 active:before:opacity-100 before:absolute before:inset-1.5 before:rounded-full"
							/>
							<Panel
								minSize={20}
								defaultSize={35}
								collapsedSize={0}
								collapsible
								data-resizing={resizing}
								className="data-[resizing=true]:pointer-events-none"
							>
								<Chats resizing={resizing} />
							</Panel>
						</>
					)}
				</PanelGroup>

				<StreamersDialog locale={params.locale} channels={channels} />
				<OrganizeDialog locale={params.locale} />
			</main>
		</TooltipProvider>
	);
}
