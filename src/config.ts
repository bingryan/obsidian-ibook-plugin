export const IBOOK_LIBRARY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite'
export const IBOOK_ANNOTATION = '~/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/AEAnnotation_v10312011_1727_local.sqlite'
export const IBOOK_RECENTLY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BCRecentlyOpenedBooksDB/BCRecentlyOpenedBooksDB.sqlite'
export const IBOOK_SERIES = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKSeriesDatabase/BKSeries-1-012820141020.sqlite'
export const IBOOK_SNAPSHOTS = '/Users/legotime/Library/Containers/com.apple.iBooksX/Data/Documents/BKSnapshotManager/BookSnapshots.sqlite'
export interface IbookPluginSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: IbookPluginSettings = {
	mySetting: 'default'
};

