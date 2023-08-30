import ChatContext from "@/contexts/ChatContext";
import { useList } from "@/utils/useList";
import { CaretDoubleLeft, CaretDoubleRight, X } from "@phosphor-icons/react";
import { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { TwitchChat } from "react-twitch-embed";

interface Props {}

export interface ChatRef {
	chatSelect: (streamer: string) => boolean;
}

export const Chats = forwardRef<ChatRef>(function Chats({}: Props, ref) {
	const [chatList, { addItem, updateList, moveItem }] = useList<string>([]);

	function chatSelect(streamer: string) {
		if (chatList.includes(streamer)) {
			updateList((old) => old.filter((a) => a !== streamer));
			return false;
		} else if (chatList.length >= 4) return false;

		addItem(streamer, -1);

		return true;
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
					style={{ flex: chatList.length > 2 ? 1 : 0.5 }}
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
							<div className="flex justify-between w-full px-3 py-1 items-center">
								<span className="text-white">{chat}</span>
								<div className="space-x-1 flex items-center">
									<button
										onClick={() => moveItem(index, "down")}
									>
										<CaretDoubleLeft
											size={20}
											color="#fff"
										/>
									</button>
									<button
										onClick={() => moveItem(index, "up")}
									>
										<CaretDoubleRight
											size={20}
											color="#fff"
										/>
									</button>
									<button onClick={() => chatSelect(chat)}>
										<X size={20} color="#fff" />
									</button>
								</div>
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
