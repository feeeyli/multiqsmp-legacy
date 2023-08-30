import { CSSProperties, useContext, useRef, useState } from "react";
import {
	TwitchEmbed,
	TwitchEmbedInstance,
	TwitchPlayer,
	TwitchPlayerInstance,
} from "react-twitch-embed";
import { Header } from "./Header";

interface Props {
	channel: string;
	columns: number;
	id: number;
	onChatSelect: (streamer: string) => boolean;
	onMovePlayer: (direction: "up" | "down") => void;
}

function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
}

export const Player = ({
	channel,
	columns,
	id,
	onChatSelect,
	onMovePlayer,
}: Props) => {
	const playerRef = useRef<TwitchEmbedInstance>();

	const containerRef = useRef<HTMLDivElement>(null);

	let style: CSSProperties = {
		width: `${100 / Math.floor(columns)}%`,
		position: "relative",
		inset: 0,
	};

	const handleFullscreenChange = (full: boolean) => {
		if (!containerRef.current) return;

		if (full) {
			containerRef.current.style.width = "auto";
			containerRef.current.style.position = "absolute";
			containerRef.current.style.zIndex = "100";
		} else {
			containerRef.current.style.width = `${100 / Math.floor(columns)}%`;
			containerRef.current.style.position = "relative";
			containerRef.current.style.zIndex = "0";
		}
	};

	return (
		<div className="relative flex-grow" style={style} ref={containerRef}>
			<Header
				onMuteChange={(mute) => playerRef.current?.setMuted(mute)}
				onFullscreenChange={(full) => handleFullscreenChange(full)}
				onChatSelect={() => onChatSelect(channel)}
				onMovePlayer={(direction: "up" | "down") =>
					onMovePlayer(direction)
				}
			/>
			<TwitchEmbed
				muted
				withChat={false}
				channel={channel}
				className="!h-full !w-full"
				id={uuidv4()}
				onVideoReady={(obj: TwitchEmbedInstance) =>
					(playerRef.current = obj)
				}
			/>
		</div>
	);
};
