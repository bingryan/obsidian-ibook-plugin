import { Plugin, Editor } from "obsidian";
import { IbookSettingTab } from "@/settings";
import { IbookPluginSettings, DEFAULT_SETTINGS } from "@/config";
import { IExport, IBookExport } from "@/export";
import { LibraryAsset,GoodReadBook } from "@/types";
import { getAllBooks } from "@/api/ibook";
import { IBookSearchModal, GoodReadBookFuzzySuggestModal } from "@/ui/search";
import { tryCreateFolder } from "@/utils/misc";
import { Fetch } from "@/utils/net";


export default class IbookPlugin extends Plugin {
	settings: IbookPluginSettings;
	export: IExport;

	bookLibrary: LibraryAsset[];

	async onload() {
		await this.loadSettings();
		await this.loadBookLibrary();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new IbookSettingTab(this.app, this));
		this.export = new IBookExport(this.settings, this);

		this.addCommand({
			id: "Export All Highlights",
			name: "Export all highlights from iBooks",
			callback: () => {
				this.export.all();
			},
		});

		this.addCommand({
			id: "export-by-search",
			name: "Export by Search",
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "b" }],
			callback: () => {
				tryCreateFolder(this, this.settings.output);
				const modal = new IBookSearchModal(this.app, this);
				modal.open();
			},
		});

		this.addCommand({
			id: "insert-annotion-by-search",
			name: "Insert Annotion by Search",
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "i" }],
			editorCallback: (editor) => {
				this.handleIbookAnnotationForActiveFile(editor);
				return true;
			},
		});
	}

	onunload() { }

	async handleIbookAnnotationForActiveFile(editor: Editor) {
		const activeFile = await this.app.workspace.getActiveFile();
		if (activeFile) {
			// TODO: add setting
			const term = activeFile.basename;
			if (term) {
				await this.searchGoodReadBook(editor,term);
			}
		}
	}

	async searchGoodReadBook(editor: Editor,term:string) {
		const url = `https://www.goodreads.com/book/auto_complete?format=json&q=${term}`
		const goodReadBooks = await Fetch.get<GoodReadBook>(url);
		const modal = new GoodReadBookFuzzySuggestModal(this.app, this, editor,goodReadBooks);
		modal.open();
	}


	async loadBookLibrary() {
		this.bookLibrary = await getAllBooks();
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
