import NewGame from "../new-game/NewGame";
import Overlay from "../overlay/Overlay";
import Tile from "../tile/Tile";
import Winner from "../winner/Winner";
import shuffle from "../../Utils";
import "./Board.css";
import { useState, useEffect } from "react";

interface tileData {
	value: number;
	index: number;
}

export const Board = () => {
	const [numbers, setNumbers] = useState<tileData[]>([]);
	const [animating, setAnimating] = useState(false);

	const moveTile = (tile: tileData) => {
		const i16 = numbers.find((n) => n.value === 16)!.index;
		if (![i16 - 1, i16 + 1, i16 - 4, i16 + 4].includes(tile.index) || animating)
			return;
		const newNumbers = [...numbers].map((number) => {
			if (number.index !== i16 && number.index !== tile.index) return number;
			else if (number.value === 16) return { value: 16, index: tile.index };

			return { value: tile.value, index: i16 };
		});
		setAnimating(true);
		setNumbers(newNumbers);
		setTimeout(() => setAnimating(false), 200);
	};

	const handleKeyDown = (e: any) => {
		const i16 = numbers.find((n) => n.value === 16)!.index;
		if (e.keyCode === 37 && !(i16 % 4 === 3))
			moveTile(numbers.find((n) => n.index === i16 + 1)!);
		else if (e.keyCode === 38 && !(i16 > 11))
			moveTile(numbers.find((n) => n.index === i16 + 4)!);
		else if (e.keyCode === 39 && !(i16 % 4 === 0))
			moveTile(numbers.find((n) => n.index === i16 - 1)!);
		else if (e.keyCode === 40 && !(i16 < 4))
			moveTile(numbers.find((n) => n.index === i16 - 4)!);
	};

	const reset = () => setNumbers(shuffle);

	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	useEffect(reset, []);

	return (
		<div className="Game">
			<div className="board">
				<Overlay />
				{numbers.map((x, i) => {
					return <Tile key={i} tileNumber={x} moveTile={moveTile} />;
				})}
				<Winner numbers={numbers} />
			</div>

			<NewGame onClick={reset} />
		</div>
	);
};
