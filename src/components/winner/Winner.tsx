// import NewGame from "../new-game/NewGame";
import "./Winner.css";

const Winner = ({
	numbers,
}: {
	numbers: Array<{ value: number; index: number }>;
}) => {
	if (!numbers.every((n) => n.value === n.index + 1)) return null;

	return (
		<div className="winner">
			<h1>&#127882; Congratulations &#127882;</h1>
			<h1>You Won!</h1>
			<h1>&#128170; &#129504; &#128079;</h1>
		</div>
	);
};

export default Winner;
