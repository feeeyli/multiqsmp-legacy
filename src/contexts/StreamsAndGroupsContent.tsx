"use client";

import { ListReturnProps, useList } from "@/utils/useList";
import React, { createContext } from "react";

export const StreamsAndGroupsContent = createContext<ListReturnProps<string>[]>(
	[
		[
			[],
			{
				addItem() {},
				moveItem() {},
				removeItem() {},
				updateList() {},
				toggleItem() {},
			},
		],
		[
			[],
			{
				addItem() {},
				moveItem() {},
				removeItem() {},
				updateList() {},
				toggleItem() {},
			},
		],
	]
);

export const StreamsAndGroupsContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [streamsList, streamsListActions] = useList<string>([]);
	const [groupsList, groupsListActions] = useList<string>([]);

	return (
		<StreamsAndGroupsContent.Provider
			value={[
				[streamsList, streamsListActions],
				[groupsList, groupsListActions],
			]}
		>
			{children}
		</StreamsAndGroupsContent.Provider>
	);
};
