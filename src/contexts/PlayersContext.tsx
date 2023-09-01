"use client";

import { ListReturnProps, useList } from "@/utils/useList";
import React, { createContext } from "react";

export const PlayersContext = createContext<ListReturnProps<string>>([
	[],
	{
		addItem() {},
		moveItem() {},
		removeItem() {},
		updateList() {},
		toggleItem() {},
	},
]);

export const PlayersContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [playersList, playersListActions] = useList<string>([]);

	return (
		<PlayersContext.Provider value={[playersList, playersListActions]}>
			{children}
		</PlayersContext.Provider>
	);
};
