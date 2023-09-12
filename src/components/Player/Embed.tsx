import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface Props {
	channel: string;
	muted: boolean;
	isYoutubeStream: boolean;
}

export interface EmbedRefProps {
	refresh: () => void;
}

const getEmbedUrl = (isYoutubeStream: boolean, channel: string) => {
	if (isYoutubeStream)
		return `https://www.youtube.com/embed/live_stream?channel=${channel}`;

	return `https://player.twitch.tv/${channel}`;
};

export const Embed = forwardRef(function Embed(
	{ channel, muted, isYoutubeStream }: Props,
	ref
) {
	const [refreshCounter, setRefreshCounter] = useState(0);

	const refresh = () => setRefreshCounter((old) => (old > 0 ? 0 : 1));

	useImperativeHandle(ref, () => {
		return {
			refresh,
		};
	});

	return (
		<>
			<ReactPlayer
				className="!h-full !w-full"
				url={getEmbedUrl(isYoutubeStream, channel)}
				muted={muted}
				playing
				controls
				key={refreshCounter}
			/>
		</>
	);
});
