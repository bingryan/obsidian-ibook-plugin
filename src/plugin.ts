import { Plugin } from "obsidian";
import { IbookSettingTab } from "@/settings";
import { IbookPluginSettings, DEFAULT_SETTINGS } from "@/config";
import { IExport, IBookExport } from "@/export";
import { LibraryAsset } from "@/types";
import { getAllBooks } from "@/api";
import { BookSearchModal } from "@/ui/search";
import { tryCreateFolder } from "@/utils";

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
			id: "export all",
			name: "ibook export all",
			callback: () => {
				this.export.all();
			},
		});

		this.addCommand({
			id: "export-by-search",
			name: "export by search",
			hotkeys: [{ modifiers: ["Mod", "Shift"], key: "b" }],
			callback: () => {
				tryCreateFolder(this, this.settings.output);
				const modal = new BookSearchModal(this.app, this);
				modal.open();
			},
		});
	}

	onunload() {}
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async loadBookLibrary() {
		this.bookLibrary = await getAllBooks();
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
