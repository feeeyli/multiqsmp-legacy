export type Streamer = {
	twitchName: string;
	displayName: string;
	avatarUrl: string;
};

interface Props {
	onClick?: (streamer: string) => void;
	streamer: Streamer;
	selected: boolean;
}

import { useTranslations } from "next-intl";
import Image from "next/image";

export const Streamer = ({ onClick, streamer, selected }: Props) => {
	const t = useTranslations("modal");

	return (
		<button
			onClick={() => onClick && onClick(streamer.twitchName)}
			data-selected={selected}
			className="group lg:overflow-hidden rounded-xl bg-[#333] w-fit h-min data-[selected=true]:shadow-[0px_0px_0px_2px_#bea7e5]"
		>
			<Image
				src={streamer.avatarUrl}
				alt={t("avatar") + streamer.displayName}
				width={128}
				height={128}
				className="pointer-events-none rounded-xl w-24 h-24 sm:w-32 sm:h-32 aspect-square"
			/>
			<div className="py-2 px-3 text-white sm:text-base text-sm break-normal text-left group-data-[selected=true]:text-cold-purple-500">
				{streamer.displayName}
			</div>
		</button>
	);
};
