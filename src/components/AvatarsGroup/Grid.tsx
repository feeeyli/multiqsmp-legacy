import Image from "next/image";
import { useTranslations } from "next-intl";
import { GroupType } from "../Group";
import { getSkinHead } from "@/utils/getSkinHead";

interface Props {
	group: GroupType;
	groupsAmount: number;
}

export const Grid = ({ group, groupsAmount }: Props) => {
	const t = useTranslations("modal.streamers");

	const cols = [3, 4].includes(groupsAmount)
		? 2
		: [5, 6, 8, 9].includes(groupsAmount)
		? 3
		: 4;

	return (
		<div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center overflow-hidden rounded-xl">
			<div className="flex flex-wrap w-full max-h-24 sm:max-h-32 justify-center">
				{group.avatars.map((avatar) => (
					<picture
						key={avatar}
						style={{
							width: `${100 / cols}%`,
						}}
					>
						<Image
							src={getSkinHead(avatar)}
							alt={`${t("avatar")} ${avatar}`}
							width={128}
							height={128}
							className="group-data-[online=false]:grayscale pointer-events-none aspect-square"
						/>
					</picture>
				))}
			</div>
		</div>
	);
};
