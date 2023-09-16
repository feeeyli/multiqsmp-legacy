import { ChatContext } from "@/contexts/ChatContext";
import { X } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

interface Props {
	resizing: boolean;
	chatList: string[];
}

export const Chats = ({ resizing, chatList }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	// const [chatList, { removeItem }] = useContext(ChatContext);

	if (chatList.length === 0) return null;

	function handleRemoveChat(chat: string) {
		const newChatList = chatList.filter((c) => c !== chat);

		const newSearchParams = new URLSearchParams(window.location.search);

		if (newChatList.length === 0) {
			newSearchParams.delete("chats");
		} else if (newSearchParams.get("chats")) {
			newSearchParams.set("chats", newChatList.join("/"));
		} else {
			newSearchParams.append("chats", newChatList.join("/"));
		}

		router.replace(
			pathname + "?" + newSearchParams.toString().replaceAll("%2F", "/")
		);
	}

	return (
		<div
			data-resizing={resizing}
			className="data-[resizing=true]:pointer-events-none flex flex-row h-full w-full"
		>
			{chatList.map((chat, index) => (
				<div
					key={index}
					className="flex-grow flex flex-col items-center bg-cold-purple-900"
				>
					<div className="flex justify-between w-full px-3 py-1 items-center">
						<span className="text-white">{chat}</span>
						<div className="space-x-1 flex items-center">
							<button onClick={() => handleRemoveChat(chat)}>
								<X size={20} color="#fff" />
							</button>
						</div>
					</div>
					{/* <TwitchChat channel={chat} className="!w-full !h-full" /> */}
					<iframe
						src={`https://www.twitch.tv/embed/${chat}/chat?parent=${window.location.hostname}&darkpopout`}
						className="!w-full !h-full"
					/>
				</div>
			))}
		</div>
	);
};
