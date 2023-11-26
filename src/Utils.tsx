import { tileData } from "./components/board/Board";

const N = 4; //number of rows

export function getInvCount(arr: Array<number>) {
	let inv_count = 0;
	for (let i = 0; i < N * N - 1; i++) {
		for (let j = i + 1; j < N * N; j++) {
			// count pairs(arr[i], arr[j]) such that
			// i < j but arr[i] > arr[j]
			if (arr[j] && arr[i] && arr[i] > arr[j]) inv_count++;
		}
	}
	return inv_count;
}

export function findXPosition(arr: Array<number>) {
	const i16 = arr.indexOf(0);
	if (i16 <= 3) {
		return 0;
	} else if (i16 <= 7) {
		return 1;
	} else if (i16 <= 11) {
		return 2;
	}
	return 3;
}

export function isSolvable(arr: Array<tileData>) {
	let values = arr.map((n) => (n.value === 16 ? 0 : n.value));
	// Count inversions in given puzzle
	let invCount = getInvCount(values);

	// If grid is odd, return true if inversion
	// count is even.
	if (N & 1) return !(invCount & 1);
	else {
		// grid is even
		let pos = findXPosition(values);
		if (pos & 1) return !(invCount & 1);
		else return invCount & 1;
	}
}

export function shuffle() {
	let arr = [];

	do {
		arr = new Array(16)
			.fill(undefined)
			.map((_, i) => i + 1)
			.sort(() => Math.random() - 0.5)
			.map((x, i) => ({ value: x, index: i }));
	} while (isSolvable(arr) !== true);
	return arr;
}
