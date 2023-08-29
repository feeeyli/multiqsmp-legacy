"use client";

import React, { createContext, useState } from "react";

type PropsChatContext = {
	chatList: string[];
	setChatList: React.Dispatch<React.SetStateAction<string[]>>;
};

const ChatContext = createContext<PropsChatContext>({
	chatList: [],
	setChatList: () => {},
});

export const ChatContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [chatList, setChatList] = useState<string[]>([]);

	return (
		<ChatContext.Provider
			value={{
				chatList,
				setChatList,
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export default ChatContext;
