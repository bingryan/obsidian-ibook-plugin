import { LibraryAsset, Annotation } from "./types";
import { IBOOK_LIBRARY, IBOOK_ANNOTATION } from "./config"
import { sqlite3 } from './utils';


export async function getAllBook(): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
	`
	return await sqlite3<LibraryAsset[]>(sql, IBOOK_LIBRARY);
}

export async function getAllBookId(): Promise<string[]> {
	const sql = `
		SELECT 
			ZASSETID
		FROM ZBKLIBRARYASSET
	`
	return await sqlite3<string[]>(sql, IBOOK_LIBRARY);
}

export async function getBookById(assetId: string): Promise<LibraryAsset> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
		WHERE ZASSETID == "${assetId}"
	`
	return await sqlite3<LibraryAsset>(sql, IBOOK_LIBRARY);
}

export async function getAllAnnotionBookId(): Promise<string[]> {
	const sql = `
	SELECT 
		ZANNOTATIONASSETID 
	FROM ZAEANNOTATION

`
	return await sqlite3<string[]>(sql, IBOOK_ANNOTATION);
}

export async function getAnnotationBookId(assetId: string): Promise<Annotation> {
	const sql = `
		SELECT 
			* 
		FROM ZAEANNOTATION
		WHERE ZANNOTATIONASSETID LIKE '${assetId}'
		ORDER BY ZPLLOCATIONRANGESTART,ZFUTUREPROOFING6
	`
	return await sqlite3<Annotation>(sql, IBOOK_ANNOTATION);
}
