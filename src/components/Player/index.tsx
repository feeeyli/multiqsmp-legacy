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
} from "@radix-ui/react-icons";

interface Props {
	channel: string;
	columns: number;
	id: string;
}

const PlayerComponent = ({ channel, columns, id }: Props) => {
	const [chatlist, { toggleItem: toggleChat }] = useContext(ChatContext);
	const [muted, setMuted] = useState(true);
	const [fullScreen, setFullScreen] = useState(false);
	const [headerMenuOpened, setHeaderMenuOpened] = useState(false);

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

	return (
		<div
			className="relative flex-grow inset-0"
			style={fullScreen ? fullScreenStyle : normalScreenStyle}
		>
			<header
				data-opened={headerMenuOpened}
				className="group/menu absolute top-0 left-0 rounded-br-md bg-[#302a3963] flex items-center w-9 h-7 overflow-hidden data-[opened=true]:w-[6.25rem] sm:data-[opened=true]:w-[8.25rem] transition-all"
			>
				<button
					className="px-2 py-1 hover:bg-[#302a39a1] focus:bg-[#302a39a1] h-full outline-none"
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
						className="px-2 py-1 focus:bg-[#302a39a1] hover:bg-[#302a39a1] h-full outline-none"
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
						className="px-2 py-1 focus:bg-[#302a39a1] hover:bg-[#302a39a1] h-full outline-none"
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
					<button
						onClick={() => {
							if (chatlist.length >= 4 && !channelSelected)
								return;

							toggleChat(channel, -1);
						}}
						tabIndex={headerMenuOpened ? 0 : -1}
						className="sm:inline-block hidden px-2 py-1 focus:bg-[#302a39a1] hover:bg-[#302a39a1] h-full outline-none"
					>
						<ChatBubbleIcon
							color="#fff"
							data-opened={channelSelected}
							className="opacity-50 data-[opened=true]:opacity-100 h-4 w-4"
						/>
					</button>
				</div>
			</header>
			<Embed channel={channel} id={id} ref={embedRef} />
		</div>
	);
};

export const Player = memo(PlayerComponent);
