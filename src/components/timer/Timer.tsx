import "./Timer.css";
import { useState, useEffect } from "react";

const Timer = ({
	startTimer,
	reset,
}: {
	startTimer: boolean;
	reset: boolean;
}) => {
	const [time, setTime] = useState(0);
	const isRunning = startTimer;

	useEffect(() => {
		let intervalId: any;
		if (isRunning) {
			intervalId = setInterval(() => setTime(time + 1), 10);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	const minutes = Math.floor((time % 360000) / 6000);

	const seconds = Math.floor((time % 6000) / 100);

	const resetTimer = () => {
		setTime(0);
	};
	useEffect(() => {
		if (reset === true) {
			resetTimer();
		}
	});

	return (
		<div className="stopwatch-container">
			<p className="stopwatch-text">Time:</p>
			<p className="stopwatch-time">
				{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
			</p>
		</div>
	);
};
export default Timer;
