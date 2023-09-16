import { GroupType } from "@/components/Group";

export function sortGroups(array: GroupType[]) {
	return array.sort((a, b) =>
		a.groupName < b.groupName ? -1 : a.groupName > b.groupName ? 1 : 0
	);
}
