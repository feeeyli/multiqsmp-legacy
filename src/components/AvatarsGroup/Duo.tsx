import Image from "next/image";
import { useTranslations } from "next-intl";
import { GroupType } from "../Group";
import { getSkinHead } from "@/utils/getSkinHead";

interface Props {
	group: GroupType;
}

export const Duo = ({ group }: Props) => {
	const t = useTranslations("modal.streamers");

	return (
		<div className="w-24 h-24 sm:w-32 sm:h-32 relative">
			<Image
				src={getSkinHead(group.avatars[0])}
				alt={t("avatar") + group.avatars[0]}
				width={128}
				height={128}
				className="group-data-[online=false]:grayscale pointer-events-none aspect-square absolute w-[55%] h-[55%] left-0 top-0"
			/>
			<Image
				src={getSkinHead(group.avatars[1])}
				alt={t("avatar") + group.avatars[1]}
				width={128}
				height={128}
				className="group-data-[online=false]:grayscale pointer-events-none aspect-square absolute w-[55%] h-[55%] right-0 bottom-0"
			/>
		</div>
	);
};
