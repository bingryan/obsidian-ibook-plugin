import { LibraryAsset, Annotation, AnnotationAssetId, LibraryAssetId } from "@/types";
import { IBOOK_LIBRARY, IBOOK_ANNOTATION } from "@/config"
import { sqlite3 } from '@/utils';


export async function getAllBook(): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
	`
	return await sqlite3<LibraryAsset[]>(sql, IBOOK_LIBRARY);
}

export async function getAllBookId(): Promise<LibraryAssetId[]> {
	const sql = `
		SELECT 
			DISTINCT ZASSETID
		FROM ZBKLIBRARYASSET
	`
	return await sqlite3<LibraryAssetId[]>(sql, IBOOK_LIBRARY);
}

export async function getBookById(assetId: string): Promise<LibraryAsset[]> {
	const sql = `
		SELECT 
			* 
		FROM ZBKLIBRARYASSET
		WHERE ZASSETID == '${assetId}'
	`
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
	`
	return await sqlite3<AnnotationAssetId[]>(sql, IBOOK_ANNOTATION);
}

export async function getAnnotationBookId(assetId: string): Promise<Annotation[]> {
	const sql = `
		SELECT 
			* 
		FROM ZAEANNOTATION
		WHERE ZANNOTATIONASSETID == '${assetId}'
		ORDER BY ZPLLOCATIONRANGESTART,ZFUTUREPROOFING6
	`
	return await sqlite3<Annotation[]>(sql, IBOOK_ANNOTATION);
}
