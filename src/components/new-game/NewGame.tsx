import "./NewGame.css";

const NewGame = ({ onClick }: { onClick?: React.MouseEventHandler }) => {
	return (
		<div className="button-wrapper">
			<button onClick={onClick}>New Game</button>
		</div>
	);
};

export default NewGame;
