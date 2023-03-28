import {
	LibraryAsset,
	Annotation,
	AnnotationAssetId,
	LibraryAssetId,
} from "@/types";
import { IBOOK_LIBRARY, IBOOK_ANNOTATION } from "@/config";
import { sqlite3 } from "@/util/misc";

export async function getAllBooks(): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
	`;
	return await sqlite3<LibraryAsset[]>(sql, IBOOK_LIBRARY);
}

export async function getAllBookId(): Promise<LibraryAssetId[]> {
	const sql = `
		SELECT 
			DISTINCT ZASSETID
		FROM ZBKLIBRARYASSET
	`;
	return await sqlite3<LibraryAssetId[]>(sql, IBOOK_LIBRARY);
}

export async function getBookById(assetId: string): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
		WHERE ZASSETID == '${assetId}'
	`;
	return await sqlite3<LibraryAsset[]>(sql, IBOOK_LIBRARY);
}

export async function getAllAnnotionBookId(): Promise<AnnotationAssetId[]> {
	const sql = `
		SELECT 
			DISTINCT ZANNOTATIONASSETID 
		FROM ZAEANNOTATION
		WHERE ZANNOTATIONASSETID IS NOT NULL
		AND ZANNOTATIONASSETID != ''
		AND ZANNOTATIONLOCATION IS NOT NULL
	`;
	return await sqlite3<AnnotationAssetId[]>(sql, IBOOK_ANNOTATION);
}

export async function getAnnotationBookId(
	assetId: string,
	filterNull = true
): Promise<Annotation[]> {
	let whereCondition = `WHERE ZANNOTATIONASSETID == '${assetId}'`;
	if (filterNull) {
		whereCondition += ` AND ZANNOTATIONSELECTEDTEXT IS NOT NULL`;
	}
	const sql = `
		SELECT 
			* 
		FROM ZAEANNOTATION
		${whereCondition}
		ORDER BY ZPLLOCATIONRANGESTART,ZFUTUREPROOFING6
	`;
	return await sqlite3<Annotation[]>(sql, IBOOK_ANNOTATION);
}

export async function searchBookByName(name: string): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
		WHERE ZTITLE LIKE '%${name}%'
	`;
	return await sqlite3<LibraryAsset[]>(sql, IBOOK_LIBRARY);
}
