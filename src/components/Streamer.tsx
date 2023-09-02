export type StreamerType = {
	twitchName: string;
	displayName: string;
	avatarUrl: string;
};

interface Props {
	onClick?: (streamer: string) => void;
	streamer: StreamerType;
	selected: boolean;
	isPlayingQsmp: boolean;
	isOnline: boolean;
}

import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";

export const Streamer = ({
	onClick,
	streamer,
	selected,
	isPlayingQsmp,
	isOnline,
}: Props) => {
	const t = useTranslations("modal.streamers");

	return (
		<button
			onClick={() => onClick && onClick(streamer.twitchName)}
			data-selected={selected}
			data-online={isOnline}
			className="group lg:overflow-hidden rounded-xl bg-[#333] w-fit h-min data-[selected=true]:shadow-[0px_0px_0px_2px_#bea7e5] relative"
		>
			<Image
				src={streamer.avatarUrl}
				alt={t("avatar") + streamer.displayName}
				width={128}
				height={128}
				className="group-data-[online=false]:grayscale pointer-events-none rounded-xl w-24 h-24 sm:w-32 sm:h-32 aspect-square"
			/>
			{!isPlayingQsmp && isOnline && (
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<span className="p-1.5 rounded-md bg-kournikova-500 absolute top-2 right-2 border border-kournikova-950">
							<InfoCircledIcon className="text-kournikova-950" />
						</span>
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content
							className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-md bg-kournikova-500 text-kournikova-950 px-4 py-2 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
							sideOffset={5}
						>
							{t("noPlaying")}
							<Tooltip.Arrow className="fill-koubg-kournikova-500 text-kournikova-950" />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			)}
			<div className="py-2 px-3 max-w-[24px] sm:max-w-[32px] text-white sm:text-base text-sm text-left group-data-[selected=true]:text-cold-purple-500">
				{streamer.displayName}
			</div>
		</button>
	);
};
