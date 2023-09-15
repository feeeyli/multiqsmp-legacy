import Image from "next/image";
import { useTranslations } from "next-intl";
import { GroupType } from "../Group";
import { getSkinHead } from "@/utils/getSkinHead";

interface Props {
	group: GroupType;
}

export const Six = ({ group }: Props) => {
	const t = useTranslations("modal.streamers");

	return (
		<div className="w-24 h-24 sm:w-32 sm:h-32 relative">
			<div className="grid grid-cols-3 w-full absolute top-1/2 -translate-y-1/2">
				{group.avatars.map((avatar) => (
					<Image
						key={avatar}
						src={getSkinHead(avatar)}
						alt={t("avatar") + avatar}
						width={128}
						height={128}
						className="group-data-[online=false]:grayscale pointer-events-none aspect-square"
					/>
				))}
			</div>
		</div>
	);
};
