import "./Tile.css";

interface TileData {
	value: number;
	index: number;
}

const Tile = ({ number }: { number: TileData }) => {
	return (
		<div
			className={`number ${number.value === 16 ? "disabled" : ""} slot--${
				number.index
			}`}
		>
			{number.value === 16 ? "" : number.value}
		</div>
	);
};

export default Tile;
