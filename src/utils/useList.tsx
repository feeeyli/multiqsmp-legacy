import { Dispatch, SetStateAction, useState } from "react";

type ReturnProps<T> = [
	T[],
	{
		addItem: (item: T, index: number) => void;
		removeItem: (index: number) => void;
		moveItem: (index: number, direction: "up" | "down") => void;
		updateList: Dispatch<SetStateAction<T[]>>;
	}
];

export function useList<T>(initial: T[] = []): ReturnProps<T> {
	const [list, setList] = useState<T[]>(initial);

	const addItem = (item: T, index: number) => {
		if (index === -1) {
			setList((old) => [...old, item]);
		} else {
			setList((old) => {
				const beforeIndex = old.slice(0, index);

				const afterIndex = old.slice(index);

				return [...beforeIndex, item, ...afterIndex];
			});
		}
	};

	const removeItem = (index: number) => {
		if (index === -1) {
			setList((old) => old.slice(0, -1));
		} else {
			setList((old) => {
				const beforeIndex = old.slice(0, index);

				const afterIndex = old.slice(index + 1);

				return [...beforeIndex, ...afterIndex];
			});
		}
	};

	const moveItem = (index: number, direction: "up" | "down") => {
		if (
			(index <= 0 && direction === "down") ||
			(index >= list.length && direction === "up")
		)
			return;

		if (direction === "down") {
			setList((old) => {
				const itemOnIndex = old[index];

				const itemAfter = old[index - 1];

				const result = [...old];

				result[index] = itemAfter;

				result[index - 1] = itemOnIndex;

				return result;
			});
		}

		if (direction === "up") {
			setList((old) => {
				const itemOnIndex = old[index];

				const itemBefore = old[index + 1];

				const result = [...old];

				result[index] = itemBefore;

				result[index + 1] = itemOnIndex;

				return result;
			});
		}
	};

	return [list, { addItem, removeItem, moveItem, updateList: setList }];
}
