import { useLocalStorage } from "usehooks-ts";
import { StreamerType } from "./Streamer";
import { GROUPS } from "@/data/groups";
import { PlusIcon } from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";
import { GroupType } from "./Group";

function getAvatar(name: string) {
	if (name === "tazercraft") return ["mikethelink", "pactw"];

	return [name];
}

interface Props {
	selectedStreamers: StreamerType[];
}

export const CreateGroup = ({ selectedStreamers }: Props) => {
	const t = useTranslations("modal.streamers");

	const [customGroups, setCustomGroups] = useLocalStorage<typeof GROUPS>(
		"customGroups",
		[]
	);

	function handleCreateGroup() {
		if (selectedStreamers.length === 0) return;

		const groupName = prompt(
			`${t("chooseGroupName")} (${selectedStreamers
				.map((s) => s.displayName)
				.join(", ")})`
		);

		if (!groupName) return;

		if (
			GROUPS.map((g) => g.groupName).includes(groupName) ||
			customGroups.map((g) => g.groupName).includes(groupName)
		)
			return handleCreateGroup();

		let avatars: string[] = [];

		selectedStreamers.forEach((s) => {
			avatars.push(...getAvatar(s.twitchName));
		});

		const newGroup: GroupType = {
			groupName,
			simpleGroupName: groupName.toLowerCase(),
			members: selectedStreamers.map((s) => s.displayName),
			twitchNames: selectedStreamers.map((s) => s.twitchName),
			avatars,
		};

		setCustomGroups((old) => [...old, newGroup]);
	}

	return (
		<button
			className="flex font-light items-center gap-2 text-white hover:bg-zinc-800 p-2 px-4 rounded-lg transition-colors"
			onClick={handleCreateGroup}
		>
			{t("createGroup")} <PlusIcon className="h-4 w-4" />
		</button>
	);
};
