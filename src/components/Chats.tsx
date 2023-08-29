import ChatContext from "@/contexts/ChatContext";
import { X } from "@phosphor-icons/react";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { TwitchChat } from "react-twitch-embed";

interface Props {}

export interface ChatRef {
	chatSelect: (streamer: string) => void;
}

export const Chats = forwardRef<ChatRef>(function Chats({}: Props, ref) {
	const { chatList, setChatList } = useContext(ChatContext);

	function chatSelect(streamer: string) {
		if (chatList.includes(streamer)) {
			return setChatList((old) => old.filter((a) => a !== streamer));
		} else if (chatList.length >= 4) return;

		setChatList((old) => [...old, streamer]);
	}

	useImperativeHandle(ref, () => {
		return {
			chatSelect,
		};
	});

	return (
		<>
			{chatList.length > 0 && (
				<div
					className="max-w-1/2 flex flex-col flex-wrap"
					style={{ width: `${chatList.length > 2 ? 50 : 25}%` }}
				>
					{chatList.map((chat, index) => (
						<div
							key={index}
							style={{
								height: `${chatList.length >= 2 ? 50 : 100}%`,
								width: `${chatList.length > 2 ? 50 : 100}%`,
							}}
							className="flex-grow flex flex-col items-center bg-cold-purple-900"
						>
							<div className="flex justify-between w-full px-3 py-1">
								<span className="text-white">{chat}</span>
								<button onClick={() => chatSelect(chat)}>
									<X size={20} color="#fff" />
								</button>
							</div>
							<TwitchChat
								channel={chat}
								className="!w-full !h-full"
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
});
