const Observable = () => {
	let observers = [];

	const addObserver = (observer) => {
		observers.push(observer);
	};

	const notify = (data) => {
		if (observers.length) {
			observers.forEach((observer) => observer.update(data));
		}
	};

	const removeObserver = (observer) => {
		const removeIndex = observers.findIndex((observerIteration) => observer === observerIteration);

		if (removeIndex < -1) {
			observers.splice(removeIndex, 1);
		}
	};

	return ({
		addObserver,
		notify,
		removeObserver,
	});
};

export default Observable;
