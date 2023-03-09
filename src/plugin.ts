import { Plugin } from "obsidian";
import {IbookSettingTab} from "@/settings";
import { IbookPluginSettings, DEFAULT_SETTINGS } from "@/config";
import { IExport, IBookExport } from "@/export";

export default class IbookPlugin extends Plugin {
	settings: IbookPluginSettings;
	export: IExport;

	async onload() {
		await this.loadSettings();


		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new IbookSettingTab(this.app, this));
		this.export = new IBookExport(this.settings, this);


		this.addCommand({
			id: 'export',
			name: 'ibook export',
			callback: () => {
				this.export.start();
				//refresh the view
				this.app.workspace.trigger("file-open");
			}
		});
	}

	onunload() {
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
