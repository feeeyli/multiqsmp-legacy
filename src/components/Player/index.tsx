import { CSSProperties, memo, useContext, useRef, useState } from "react";
import { Embed, EmbedRefProps } from "./Embed";
import { ChatContext } from "@/contexts/ChatContext";

import {
	ChevronLeftIcon,
	ChatBubbleIcon,
	EnterFullScreenIcon,
	ExitFullScreenIcon,
	SpeakerLoudIcon,
	SpeakerOffIcon,
	UpdateIcon,
} from "@radix-ui/react-icons";
import { getChannel } from "@/utils/getStreamUrl";
import ReactPlayer from "react-player";
import { useMediaQuery } from "@uidotdev/usehooks";
import { YTEmbed } from "./YTEmbed";

interface Props {
	channel: string;
	columns: number;
	isYoutubeStream: boolean;
	id: string;
}

const PlayerComponent = ({ columns, id, isYoutubeStream, ...props }: Props) => {
	const [chatlist, { toggleItem: toggleChat }] = useContext(ChatContext);
	const [muted, setMuted] = useState(true);
	const [fullScreen, setFullScreen] = useState(false);
	const [headerMenuOpened, setHeaderMenuOpened] = useState(false);

	const channel = getChannel(props.channel);

	const normalScreenStyle: CSSProperties = {
		width: `${100 / Math.floor(columns)}%`,
		position: "relative",
		zIndex: 0,
	};

	const fullScreenStyle: CSSProperties = {
		width: "auto",
		position: "absolute",
		zIndex: 100,
	};

	const embedRef = useRef<EmbedRefProps>();

	const handleMutedToggle = () => {
		embedRef.current?.setMuted(!muted);

		setMuted(!muted);
	};

	const channelSelected = chatlist.includes(channel);

	const isDesktop = useMediaQuery("(min-width: 640px)");

	return (
		<div
			className="relative flex-grow inset-0"
			style={fullScreen ? fullScreenStyle : normalScreenStyle}
		>
			<header
				data-opened={headerMenuOpened}
				data-show-chat={isYoutubeStream}
				data-yt-stream={isYoutubeStream}
				className="group/menu absolute top-1 left-1 rounded-md bg-[#302a3963] flex items-center w-9 h-7 overflow-hidden data-[opened=true]:w-full max-w-[10.25rem] data-[yt-stream=true]:max-w-[6.25rem] data-[show-chat=true]:max-w-[8.25rem] transition-all"
			>
				<button
					className="px-2 py-1 hover:bg-[#302a3963] h-full"
					onClick={() => setHeaderMenuOpened((old) => !old)}
				>
					<ChevronLeftIcon
						className="h-5 w-5 group-data-[opened=true]/menu:rotate-180 transition-all"
						color="#fff"
					/>
				</button>
				<div className="min-w-[6rem] h-full">
					<button
						tabIndex={headerMenuOpened ? 0 : -1}
						className="px-2 py-1 hover:bg-[#302a3963] h-full"
						onClick={handleMutedToggle}
					>
						{muted && (
							<SpeakerOffIcon className="h-4 w-4" color="#fff" />
						)}
						{!muted && (
							<SpeakerLoudIcon className="h-4 w-4" color="#fff" />
						)}
					</button>
					<button
						tabIndex={headerMenuOpened ? 0 : -1}
						className="px-2 py-1 hover:bg-[#302a3963] h-full"
						onClick={() => setFullScreen((old) => !old)}
					>
						{fullScreen && (
							<EnterFullScreenIcon
								className="h-4 w-4"
								color="#fff"
							/>
						)}
						{!fullScreen && (
							<ExitFullScreenIcon
								className="h-4 w-4"
								color="#fff"
							/>
						)}
					</button>
					{!isYoutubeStream && (
						<button
							onClick={() => {
								if (
									isDesktop &&
									chatlist.length >= 4 &&
									!channelSelected
								)
									return;

								if (
									!isDesktop &&
									chatlist.length >= 2 &&
									!channelSelected
								)
									return;

								toggleChat(channel, -1);
							}}
							tabIndex={headerMenuOpened ? 0 : -1}
							className="inline-block px-2 py-1 hover:bg-[#302a3963] h-full"
						>
							<ChatBubbleIcon
								color="#fff"
								data-opened={channelSelected}
								className="opacity-50 data-[opened=true]:opacity-100 h-4 w-4"
							/>
						</button>
					)}
					{!isYoutubeStream && (
						<button
							onClick={() => {
								embedRef.current?.refresh();
							}}
							tabIndex={headerMenuOpened ? 0 : -1}
							className="inline-block px-2 py-1 hover:bg-[#302a3963] h-full"
						>
							<UpdateIcon color="#fff" className="h-4 w-4" />
						</button>
					)}
				</div>
			</header>
			{isYoutubeStream && <YTEmbed channel={channel} muted={muted} />}
			{!isYoutubeStream && (
				<Embed channel={channel} id={id} ref={embedRef} />
			)}
		</div>
	);
};

export const Player = memo(PlayerComponent);
