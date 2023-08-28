import { SpeakerHigh, SpeakerX } from "@phosphor-icons/react";
import { useRef, useState } from "react";
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

	return (
		<div
			className="relative"
			style={{
				width: `${100 / Math.floor(columns)}%`,
			}}
		>
			<Header
				onMuteChange={(mute) => playerRef.current?.setMuted(mute)}
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
