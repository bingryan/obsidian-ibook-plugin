import {
	App,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import { IbookPluginSettings, DEFAULT_SETTINGS } from "@/config";
import { IExport, IBookExport } from "@/export";
import { tryCreateFolder } from "@/utils";



export default class IbookPlugin extends Plugin {
	settings: IbookPluginSettings;
	export: IExport;

	async onload() {
		await this.loadSettings();
		await tryCreateFolder(
			this,
			this.settings.output,
		);

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new IbookSettingTab(this.app, this));
		this.export = new IBookExport(this.settings, this);


		this.addCommand({
			id: 'Ibook-export-command',
			name: 'IBook export',
			callback: () => {
				this.export.start();
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

class IbookSettingTab extends PluginSettingTab {
	plugin: IbookPlugin;

	constructor(app: App, plugin: IbookPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "Settings for my awesome plugin." });

		new Setting(containerEl)
			.setName("Setting #1")
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder("Enter your secret")
					.setValue(this.plugin.settings.output)
					.onChange(async (value) => {
						console.log("Secret: " + value);
						this.plugin.settings.output = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
