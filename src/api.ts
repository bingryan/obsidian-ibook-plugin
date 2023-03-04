import BetterSqlite3 from 'better-sqlite3';
import { LibraryAsset } from "./types";
// import { IBOOK_LIBRARY } from "./config"

// export const IBOOK_LIBRARY = '/Users/legotime/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite'

export const getBooks = (): Promise<LibraryAsset[]> => {
	return new Promise((resolve, reject) => {
		// const db = new Database('/Users/legotime/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite');
		// const db = new Database(":memory:");
		// const db: Database = new DatabaseConstructor('/tmp/sqlite.db');
		const db = new BetterSqlite3(':memory:');

		// const sql = `SELECT * FROM ZBKLIBRARYASSET`;
		const sql = `CREATE TABLE comments (value TEXT, user_id INTEGER NOT NULL REFERENCES users)`;
		return db.prepare(sql).all();
	});
}
