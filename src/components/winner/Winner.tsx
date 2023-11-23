import { useState } from "react";
import "./Winner.css";

interface numbersData {
	value: number;
	index: number;
}

const Div = () => {
	const [isHide, setIsHide] = useState(true);

	setTimeout(() => setIsHide(false), 1000);

	return (
		<>
			{!isHide ? (
				<div className="winner">
					<h1>&#127882; Congratulations &#127882;</h1>
					<h1>You Won!</h1>
					<h1>&#128170; &#129504; &#128079;</h1>
				</div>
			) : null}
		</>
	);
};

const Winner = ({ numbers }: { numbers: numbersData[] }) => {
	if (!numbers.every((n) => n.value === n.index + 1)) return null;

	return Div();
};

export default Winner;
