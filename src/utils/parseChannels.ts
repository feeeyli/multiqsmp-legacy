import { STREAMERS } from "@/streamers";

export function parseChannels(channels: string[]) {
	const acceptedStreamers = STREAMERS.map((streamer) =>
		streamer.twitchName.toLowerCase()
	);

	const filteredChannels = channels.filter((channel) =>
		acceptedStreamers.includes(channel.toLowerCase())
	);

	const channelsWithoutDuplicates = [...new Set(filteredChannels)];

	return channelsWithoutDuplicates;
}
