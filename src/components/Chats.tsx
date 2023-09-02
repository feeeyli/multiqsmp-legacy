import { ChatContext } from "@/contexts/ChatContext";
import { X } from "@phosphor-icons/react";
import { useContext } from "react";
import { TwitchChat } from "react-twitch-embed";

interface Props {}

export const Chats = ({}: Props) => {
	const [chatList, { removeItem }] = useContext(ChatContext);

	if (chatList.length === 0) return null;

	return (
		<div className="flex flex-row sm:flex-col flex-wrap h-full w-full">
			{chatList.map((chat, index) => (
				<div
					key={index}
					style={{
						height: `${chatList.length >= 2 ? 50 : 100}%`,
						width: `${chatList.length > 2 ? 50 : 100}%`,
					}}
					className="flex-grow flex flex-col items-center bg-cold-purple-900 !w-1/2 !h-full sm:w-auto sm:h-auto"
				>
					<div className="flex justify-between w-full px-3 py-1 items-center">
						<span className="text-white">{chat}</span>
						<div className="space-x-1 flex items-center">
							<button
								onClick={() =>
									removeItem(chatList.indexOf(chat))
								}
							>
								<X size={20} color="#fff" />
							</button>
						</div>
					</div>
					<TwitchChat channel={chat} className="!w-full !h-full" />
				</div>
			))}
		</div>
	);
};
