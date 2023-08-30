import {
	ArrowsIn,
	ArrowsOut,
	CaretDoubleLeft,
	CaretDoubleRight,
	CaretDown,
	CaretUp,
	Chat,
	SpeakerHigh,
	SpeakerX,
} from "@phosphor-icons/react";
import { useState } from "react";

interface Props {
	onMuteChange: (mute: boolean) => void;
	onChatSelect: () => boolean;
	onFullscreenChange: (full: boolean) => void;
	onMovePlayer: (direction: "up" | "down") => void;
}

export const Header = ({
	onMuteChange,
	onFullscreenChange,
	onChatSelect,
	onMovePlayer,
}: Props) => {
	const [muted, setMuted] = useState(true);
	const [fullscreen, setFullscreen] = useState(false);
	const [opened, setOpened] = useState(false);
	const [chatOpened, setChatOpened] = useState(false);

	const handleMuteChange = () => {
		setMuted((old) => !old);

		onMuteChange(!muted);
	};

	const handleFullscreenChange = () => {
		setFullscreen((old) => !old);

		onFullscreenChange(!fullscreen);
	};

	return (
		<header className="px-2 py-1 absolute top-0 left-0 rounded-br-md bg-[#302a3963]">
			<button onClick={() => setOpened((old) => !old)}>
				{opened && <CaretDown size={20} color="#fff" />}
				{!opened && <CaretUp size={20} color="#fff" />}
			</button>
			{opened && (
				<div className="space-x-2">
					<button onClick={handleMuteChange}>
						{muted && <SpeakerX size={20} color="#fff" />}
						{!muted && <SpeakerHigh size={20} color="#fff" />}
					</button>
					<button onClick={handleFullscreenChange}>
						{fullscreen && <ArrowsIn size={20} color="#fff" />}
						{!fullscreen && <ArrowsOut size={20} color="#fff" />}
					</button>
					<button
						onClick={() => {
							setChatOpened(onChatSelect());
						}}
						className="sm:inline-block hidden"
					>
						<Chat
							size={20}
							color="#fff"
							data-opened={chatOpened}
							className="opacity-50 data-[opened=true]:opacity-100"
						/>
					</button>
					<button onClick={() => onMovePlayer("down")}>
						<CaretDoubleLeft size={20} color="#fff" />
					</button>
					<button onClick={() => onMovePlayer("up")}>
						<CaretDoubleRight size={20} color="#fff" />
					</button>
				</div>
			)}
		</header>
	);
};
