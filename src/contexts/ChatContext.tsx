"use client";

import { ListReturnProps, useList } from "@/utils/useList";
import React, { createContext } from "react";

export const ChatContext = createContext<ListReturnProps<string>>([
	[],
	{
		addItem() {},
		moveItem() {},
		removeItem() {},
		updateList() {},
		toggleItem() {},
	},
]);

export const ChatContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [chatList, chatListActions] = useList<string>([]);

	return (
		<ChatContext.Provider value={[chatList, chatListActions]}>
			{children}
		</ChatContext.Provider>
	);
};
