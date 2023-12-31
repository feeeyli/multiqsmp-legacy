import {
	CSSProperties,
	memo,
	useCallback,
	useContext,
	useRef,
	useState,
} from "react";
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
import { useMediaQuery } from "@uidotdev/usehooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {
	channel: string;
	columns: number;
	isYoutubeStream: boolean;
	id: string;
}

const PlayerComponent = ({ columns, id, isYoutubeStream, ...props }: Props) => {
	const searchParams = useSearchParams()!;
	const router = useRouter();
	const pathname = usePathname();
	// const [chatlist, { toggleItem: toggleChat }] = useContext(ChatContext);
	const [muted, setMuted] = useState(true);
	const [fullScreen, setFullScreen] = useState(false);
	const [headerMenuOpened, setHeaderMenuOpened] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const chatList =
		searchParams.get("chats") === ""
			? []
			: searchParams.get("chats")?.split("/") || [];

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
		setMuted(!muted);
	};

	const channelSelected = chatList.includes(channel);

	const isDesktop = useMediaQuery("(min-width: 640px)");

	function toggleChat(chat: string) {
		if (chatList.includes(chat)) {
			const index = chatList.indexOf(chat);

			const beforeIndex = chatList.slice(0, index);

			const afterIndex = chatList.slice(index + 1);

			return [...beforeIndex, ...afterIndex];
		} else {
			return [...chatList, chat];
		}
	}

	const chatLinkRef = useRef<HTMLAnchorElement>(null);

	return (
		<div
			className="relative flex-grow inset-0"
			style={fullScreen ? fullScreenStyle : normalScreenStyle}
		>
			{/* <Link ref={chatLinkRef} href="">
				TESTE
			</Link> */}
			<header
				data-opened={headerMenuOpened}
				data-show-chat={isYoutubeStream}
				className="group/menu absolute top-1 left-1 rounded-md bg-[#302a3963] flex items-center w-9 h-7 overflow-hidden data-[opened=true]:w-full max-w-[10.25rem] data-[show-chat=true]:max-w-[8.25rem] transition-all"
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
									chatList.length >= 4 &&
									!channelSelected
								)
									return;

								if (
									!isDesktop &&
									chatList.length >= 2 &&
									!channelSelected
								)
									return;

								const newChatList = toggleChat(channel);

								const newSearchParams = new URLSearchParams(
									window.location.search
								);

								if (newChatList.length === 0) {
									newSearchParams.delete("chats");
								} else if (newSearchParams.get("chats")) {
									newSearchParams.set(
										"chats",
										newChatList.join("/")
									);
								} else {
									newSearchParams.append(
										"chats",
										newChatList.join("/")
									);
								}

								router.replace(
									pathname +
										"?" +
										newSearchParams
											.toString()
											.replaceAll("%2F", "/")
								);

								// chatLinkRef.current!.href =
								// 	`?${newSearchParams}`;
								// chatLinkRef.current!.click();
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
					<button
						onClick={() => {
							if (refreshing) return;

							embedRef.current?.refresh();

							setRefreshing(true);

							setTimeout(() => {
								setRefreshing(false);
							}, 400);
						}}
						tabIndex={headerMenuOpened ? 0 : -1}
						className="inline-block px-2 py-1 hover:bg-[#302a3963] h-full"
					>
						<UpdateIcon
							color="#fff"
							data-refreshing={refreshing}
							className="h-4 w-4 data-[refreshing=true]:animate-wow"
						/>
					</button>
				</div>
			</header>
			<Embed
				channel={channel}
				muted={muted}
				ref={embedRef}
				isYoutubeStream={isYoutubeStream}
			/>
		</div>
	);
};

export const Player = memo(PlayerComponent);
