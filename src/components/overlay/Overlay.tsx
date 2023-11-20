import "./Overlay.css";

const Overlay = () => {
	return (
		<>
			{new Array(16).fill(undefined).map((_: any, i: number) => (
				<div key={i} className="overlay" />
			))}
		</>
	);
};

export default Overlay;
