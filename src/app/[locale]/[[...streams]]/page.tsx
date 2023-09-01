"use client";

import { StreamersDialog } from "@/components/StreamersDialog";
import { Player } from "@/components/Player";
import { Chats } from "@/components/Chats";

import { parseChannels } from "@/utils/parseChannels";
import { useTranslations } from "next-intl";
import { getColumns } from "@/utils/getColumns";
import { useContext, useEffect } from "react";
import { PlayersContext } from "@/contexts/PlayersContext";
import { OrganizeDialog } from "@/components/OrganizeDialog";

interface Props {
	params: {
		locale: string;
		streams?: string[];
	};
}

export default function Streams({ params }: Props) {
	const channels = parseChannels(params.streams || []);

	const [, { updateList }] = useContext(PlayersContext);

	useEffect(() => {
		updateList(channels);
	});

	const t = useTranslations("index");

	const columns = getColumns(channels.length);

	return (
		<main
			className={
				"h-screen max-h-screen bg-cold-purple-950 text-white w-[100%] flex pb-6 relative"
			}
		>
			<div className="flex flex-wrap h-full max-h-screen flex-1">
				{channels.map((channel) => (
					<Player
						channel={channel}
						key={channel}
						columns={columns}
						id={channel}
					/>
				))}
				{channels.length === 0 && (
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
			<Chats />
			<StreamersDialog locale={params.locale} channels={channels} />
			<OrganizeDialog locale={params.locale} />
		</main>
	);
}
