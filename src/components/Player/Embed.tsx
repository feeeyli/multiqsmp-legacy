import { forwardRef, memo, useImperativeHandle, useRef } from "react";
import {
	TwitchEmbed,
	TwitchEmbedInstance,
	TwitchEmbedProps,
} from "react-twitch-embed";

interface Props extends TwitchEmbedProps {}

export interface EmbedRefProps {
	setMuted: (muted: boolean) => void;
}

const EmbedComponent = forwardRef(function Embed({ ...props }: Props, ref) {
	const embedRef = useRef<TwitchEmbedInstance>();

	useImperativeHandle(ref, () => {
		return {
			setMuted(muted: boolean) {
				embedRef.current?.setMuted(muted);
			},
		};
	});

	return (
		<TwitchEmbed
			muted
			withChat={false}
			className="!h-full !w-full"
			onVideoReady={(obj: TwitchEmbedInstance) =>
				(embedRef.current = obj)
			}
			{...props}
		/>
	);
});

export const Embed = memo(EmbedComponent);