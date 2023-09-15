import { GROUPS } from "@/data/groups";
import { STREAMERS } from "@/data/streamers";

function getStreamersFromGroup(groups: string[]) {
	const acceptedGroups = GROUPS.map((group) => group.simpleGroupName);

	const filteredGroups = groups.filter((group) =>
		acceptedGroups.includes(group.toLowerCase())
	);

	let twitchNames: string[] = [];

	filteredGroups.forEach((group) => {
		const names = GROUPS.find(
			(g) => g.simpleGroupName === group.toLocaleLowerCase()
		)?.twitchNames;

		if (!names) return;

		twitchNames.push(...names);
	});

	return twitchNames;
}

export function parseChannels(channelsAndGroups: string[]) {
	const groups = channelsAndGroups.filter((channelOrGroup) =>
		GROUPS.find(
			(group) =>
				group.simpleGroupName === channelOrGroup.toLocaleLowerCase()
		)
	);

	const channels = channelsAndGroups.filter((channelOrGroup) =>
		STREAMERS.find(
			(group) =>
				group.twitchName.toLocaleLowerCase() ===
				channelOrGroup.toLocaleLowerCase()
		)
	);

	const acceptedChannels = STREAMERS.map((streamer) =>
		streamer.twitchName.toLowerCase()
	);

	const filteredChannels = channels.filter((channel) =>
		acceptedChannels.includes(channel.toLowerCase())
	);

	const groupsStreamers = getStreamersFromGroup(groups);

	const channelsWithoutDuplicates = [...new Set(filteredChannels)];

	const groupsWithoutDuplicates = [...new Set(groupsStreamers)];

	return [channelsWithoutDuplicates, groupsWithoutDuplicates, groups];
}
