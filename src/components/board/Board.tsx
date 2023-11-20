import Overlay from "../overlay/Overlay";
import Tile from "../tile/Tile";
import "./Board.css";
import { useState } from "react";

export const Board = () => {
	const shuffle = () =>
		new Array(16)
			.fill(undefined)
			.map((_, i) => i + 1)
			.sort(() => Math.random() - 0.5)
			.map((x, i) => ({ value: x, index: i }));

	const [numbers, SetNumbers] = useState(shuffle());

	return (
		<div className="Game">
			<div className="board">
				<Overlay />
				{numbers.map((x, i) => (
					<Tile key={i} number={x} />
				))}
			</div>
		</div>
	);
};
