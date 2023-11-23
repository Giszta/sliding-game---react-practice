const shuffle = () =>
	new Array(16)
		.fill(undefined)
		.map((_, i) => i + 1)
		.sort(() => Math.random() - 0.5)
		.map((x, i) => ({ value: x, index: i }));

export default shuffle;
