import ReactPlayer from "react-player";

interface Props {
	channel: string;
	muted: boolean;
}

export const YTEmbed = function YTEmbed({ channel, muted }: Props) {
	return (
		<ReactPlayer
			className="!h-full !w-full"
			url={`https://www.youtube.com/embed/live_stream?channel=${channel}`}
			volume={muted ? 0 : 1}
			controls
		/>
	);
};
