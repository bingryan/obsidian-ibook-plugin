export const IBOOK_LIBRARY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite'
export const IBOOK_ANNOTATION = '~/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/AEAnnotation_v10312011_1727_local.sqlite'
export const IBOOK_RECENTLY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BCRecentlyOpenedBooksDB/BCRecentlyOpenedBooksDB.sqlite'
export const IBOOK_SERIES = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKSeriesDatabase/BKSeries-1-012820141020.sqlite'
export const IBOOK_SNAPSHOTS = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKSnapshotManager/BookSnapshots.sqlite'
export interface IbookPluginSettings {
	output: string;
	notExportNoAnnotation: boolean;
	template: string;

}

const defaultTemplate = `
---
tags:
- ibook/
---

# 📔 Book: {{library.ZSORTTITLE}}

**Author**:: {{library.ZAUTHOR}}

**LANGUAGE**:: {{library.ZLANGUAGE}}

**Book Link**:: [Apple Books Link](ibooks://assetid/{{library.ZASSETID}})

{{#if library.ZBOOKDESCRIPTION}}
---
# 🧾 Description
	{{{library.ZBOOKDESCRIPTION}}}
{{/if}}

---
# 🔍 How I Discovered IT

{{#group annotation by="ZFUTUREPROOFING5"}}
- 📚{{value}}
	{{#each items}}
	{{#if ZANNOTATIONSELECTEDTEXT}}
	- 🎯{{ZANNOTATIONSELECTEDTEXT}}
	{{/if}}
		{{#if ZANNOTATIONNOTE}}
		- ✍️{{ZANNOTATIONNOTE}}
		{{/if}}
	{{/each}}
{{/group}}
`

export const DEFAULT_SETTINGS: IbookPluginSettings = {
	output: 'ibook',
	notExportNoAnnotation: true,
	template: defaultTemplate
};
