export const IBOOK_LIBRARY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKLibrary/BKLibrary-1-091020131601.sqlite'
export const IBOOK_ANNOTATION = '~/Library/Containers/com.apple.iBooksX/Data/Documents/AEAnnotation/AEAnnotation_v10312011_1727_local.sqlite'
export const IBOOK_RECENTLY = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BCRecentlyOpenedBooksDB/BCRecentlyOpenedBooksDB.sqlite'
export const IBOOK_SERIES = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKSeriesDatabase/BKSeries-1-012820141020.sqlite'
export const IBOOK_SNAPSHOTS = '~/Library/Containers/com.apple.iBooksX/Data/Documents/BKSnapshotManager/BookSnapshots.sqlite'
export interface IbookPluginSettings {
	output: string;
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

{{#if library.ZBOOKDESCRIPTION}}
---
# 🧾 Description
	{{{library.ZBOOKDESCRIPTION}}}
{{/if}}

---
# 🔍 How I Discovered IT

{{#each annotation}}
{{#if this.ZFUTUREPROOFING5}}
- 📚{{this.ZFUTUREPROOFING5}}
{{/if}}
	{{#if this.ZANNOTATIONSELECTEDTEXT}}
	- 🎯{{this.ZANNOTATIONSELECTEDTEXT}}
	{{/if}}
		{{#if this.ZANNOTATIONNOTE}}
		- {{this.ZANNOTATIONNOTE}}
		{{/if}}
{{/each}}
`

export const DEFAULT_SETTINGS: IbookPluginSettings = {
	output: 'ibook',
	template: defaultTemplate
};
