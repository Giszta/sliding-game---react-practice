import "./Tile.css";

interface TileData {
	value: number;
	index: number;
}

const Tile = ({
	tileNumber,
	moveTile,
}: {
	tileNumber: TileData;
	moveTile: Function;
}) => {
	return (
		<div
			onClick={() => moveTile(tileNumber)}
			className={`number ${tileNumber.value === 16 ? "disabled" : ""} slot--${
				tileNumber.index
			}`}
		>
			{tileNumber.value === 16 ? "" : tileNumber.value}
		</div>
	);
};

export default Tile;
