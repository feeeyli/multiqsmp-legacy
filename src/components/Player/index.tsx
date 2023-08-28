import { CSSProperties, useRef, useState } from "react";
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
}

export const Player = ({ channel, columns, id }: Props) => {
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
			/>
			<TwitchEmbed
				muted
				withChat={false}
				channel={channel}
				className="!h-full !w-full"
				id={String(id)}
				onVideoReady={(obj: TwitchEmbedInstance) =>
					(playerRef.current = obj)
				}
			/>
		</div>
	);
};
