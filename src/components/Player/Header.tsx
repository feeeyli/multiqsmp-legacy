import { SpeakerHigh, SpeakerX } from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
	onMuteChange: (mute: boolean) => void;
}

export const Header = ({ onMuteChange }: Props) => {
	const [muted, setMuted] = useState(true);

	const handleMuteChange = () => {
		setMuted((old) => !old);

		onMuteChange(!muted);
	};

	return (
		<header className="px-2 py-1 absolute top-0 left-0 rounded-br-md bg-[#302a3963]">
			<button onClick={handleMuteChange}>
				{muted && <SpeakerX size={20} color="#fff" />}
				{!muted && <SpeakerHigh size={20} color="#fff" />}
			</button>
		</header>
	);
};
