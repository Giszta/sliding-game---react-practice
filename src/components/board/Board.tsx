import NewGame from "../new-game/NewGame";
import Overlay from "../overlay/Overlay";
import Tile from "../tile/Tile";
import Winner from "../winner/Winner";
import { shuffle } from "../../Utils";
import "./Board.css";
import { useState, useEffect } from "react";
import Timer from "../timer/Timer";

export interface tileData {
	value: number;
	index: number;
}

export const Board = () => {
	const [numbers, setNumbers] = useState<tileData[]>([]);
	const [animating, setAnimating] = useState(false);

	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		if (numbers.every((n) => n.value === n.index + 1)) setIsRunning(false);
	}, [numbers]);

	const startTimer = () => {
		if (!isRunning) setIsRunning(!isRunning);
	};
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
		startTimer();
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

	const [time, setTime] = useState(false);

	const reset = () => {
		setNumbers(shuffle());
		setTime(true);
		setTimeout(() => setTime(false), 200);
		setIsRunning(false);
	};
	useEffect(() => {
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	useEffect(reset, []);

	return (
		<div className="Game">
			<Timer startTimer={isRunning} reset={time} />
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
