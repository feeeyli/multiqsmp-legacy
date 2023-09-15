import * as Avatars from "./AvatarsGroup";
import * as Tooltip from "@radix-ui/react-tooltip";

export type GroupType = {
	groupName: string;
	simpleGroupName: string;
	members: string[];
	avatars: string[];
	twitchNames: string[];
};

interface Props {
	onClick?: (streamer: string) => void;
	group: GroupType;
	selected: boolean;
	isPlayingQsmp: boolean;
	isOnline: boolean;
	isYoutubeStream?: boolean;
}

export const Group = ({
	onClick,
	group,
	selected,
	isOnline,
	isYoutubeStream = false,
}: Props) => {
	return (
		<Tooltip.Root>
			<Tooltip.Trigger asChild>
				<button
					onClick={() => onClick && onClick(group.simpleGroupName)}
					data-selected={selected}
					data-online={isYoutubeStream || isOnline}
					className="group overflow-hidden rounded-xl bg-[#333] w-fit h-min data-[selected=true]:shadow-[0px_0px_0px_2px_#bea7e5] relative"
				>
					{group.avatars.length === 2 && (
						<Avatars.Duo group={group} />
					)}
					{group.avatars.length >= 3 && (
						<Avatars.Grid
							group={group}
							groupsAmount={group.avatars.length}
						/>
					)}
					<div className="group-data-[online=false]:opacity-50 py-2 px-3 max-w-[6rem] sm:max-w-[8rem] text-white sm:text-base text-sm text-left group-data-[selected=true]:text-cold-purple-500">
						{group.groupName}
					</div>
				</button>
			</Tooltip.Trigger>
			<Tooltip.Portal>
				<Tooltip.Content
					className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade select-none rounded-md bg-cold-purple-800 text-cold-purple-50 px-4 py-2 text-sm leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
					sideOffset={5}
				>
					{group.members.join(" / ")}
					<Tooltip.Arrow className="fill-cold-purple-800" />
				</Tooltip.Content>
			</Tooltip.Portal>
		</Tooltip.Root>
	);
};
