export const getColumns = (items: number) => {
	if (items === 1) return 1;
	if (items >= 2 && items <= 6) return 2;
	if (items >= 7 && items <= 12) return 3;
	if (items >= 13 && items <= 20) return 4;
	if (items >= 21 && items <= 30) return 6;
	if (items >= 31 && items <= 35) return 7;

	return 8;
};
