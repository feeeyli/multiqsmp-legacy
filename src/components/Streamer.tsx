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
	isYoutubeStream: boolean;
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
	isYoutubeStream,
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
			{!isPlayingQsmp && isOnline && !isYoutubeStream && (
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
							<Tooltip.Arrow className="fill-kournikova-500" />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			)}
			{isYoutubeStream && (
				<Tooltip.Root>
					<Tooltip.Trigger asChild>
						<span className="p-1.5 rounded-md bg-red-500 absolute top-2 right-2 border border-red-950">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="15"
								height="15"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								className="text-red-950"
							>
								<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
								<path d="m10 15 5-3-5-3z" />
							</svg>
						</span>
					</Tooltip.Trigger>
					<Tooltip.Portal>
						<Tooltip.Content
							className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-md bg-red-500 text-red-950 px-4 py-2 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
							sideOffset={5}
						>
							{t("streamOnYoutube")}
							<Tooltip.Arrow className="fill-red-500" />
						</Tooltip.Content>
					</Tooltip.Portal>
				</Tooltip.Root>
			)}
			<div className="group-data-[online=false]:opacity-50 py-2 px-3 max-w-[24px] sm:max-w-[32px] text-white sm:text-base text-sm text-left group-data-[selected=true]:text-cold-purple-500">
				{streamer.displayName}
			</div>
		</button>
	);
};
