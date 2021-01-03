export const DB_NAME = 'minesweeperHighScores';
export const DB_VERSION = 1;
export const DB_STORE_NAME = 'highScores';

let db = null;

function getDb () {
	if (!db) {
		db = new Promise((resolve, reject) => {
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);

			request.onerror = (event) => {
				// console.log('Error opening db', event);
				reject('Error', event);
			};

			request.onsuccess = (event) => {
				resolve(event.target.result);
			};

			request.onupgradeneeded = (event) => {
				// console.log('onupgradeneeded');
				let tmpDb = event.target.result;
				tmpDb.createObjectStore(DB_STORE_NAME, { autoIncrement: true, keyPath: 'id' });
			};
		});
	}
	return db;
}

export async function readHighScores () {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		let trans = db.transaction([ DB_STORE_NAME ], 'readonly');

		trans.oncomplete = () => {
			resolve(highScores);
		};

		trans.onerror = (event) => {
			reject('Error', event);
		};

		let store = trans.objectStore(DB_STORE_NAME);
		let highScores = [];

		store.openCursor().onsuccess = (event) => {
			let cursor = event.target.result;
			if (cursor) {
				highScores.push(cursor.value);
				cursor.continue();
			}
		};
	});
}

export async function createHighScore (highScore) {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		let trans = db.transaction([ DB_STORE_NAME ], 'readwrite');

		trans.oncomplete = () => {
			resolve();
		};

		trans.onerror = (event) => {
			reject('Error', event);
		};

		let store = trans.objectStore(DB_STORE_NAME);
		store.add(highScore);
	});
}

export async function deleteHighScore (id) {
	const db = await getDb();
	return new Promise((resolve, reject) => {
		let trans = db.transaction([ DB_STORE_NAME ],'readwrite');

		trans.oncomplete = () => {
			resolve();
		};

		trans.onerror = (event) => {
			reject('Error', event);
		};

		let store = trans.objectStore(DB_STORE_NAME);
		store.delete(id);
	});
}
