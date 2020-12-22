import Observable from './Observable';

const Timer = (interval) => {
	const { addObserver, notify, removeObserver } = Observable();
	let gameTimer = null;

	const start = () => {
		// console.log('starting timer');

		if (gameTimer) {
			// console.warn('timer already running');
			stop();
		}

		gameTimer = setInterval(() => {
			// console.log('timer interval', interval, gameTimer);
			notify();
		}, interval);
	};

	const stop = () => {
		// console.log('stopping timer');
		clearInterval(gameTimer);
		gameTimer = null;
	};

	return Object.freeze({
		addObserver,
		removeObserver,
		start,
		stop,
	});
};

export default Timer;
