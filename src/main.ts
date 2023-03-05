
import {
	App,
	Editor,
	MarkdownView,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";

import { IbookPluginSettings, DEFAULT_SETTINGS } from "./config";
import { getAllBook,getAllAnnotionBookId,getAnnotationBookId } from "./api";



export default class IbookPlugin extends Plugin {
	settings: IbookPluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new IbookSettingTab(this.app, this));

		const res = await getAllBook();
		const idList = await getAllAnnotionBookId();
		
		console.log("ibook:", res);
		console.log("ibook id list:", idList);

		const annotation = await getAnnotationBookId("3FB4A96BF9A00F2589847EB9DD23674F");
		console.log("annotation:", annotation);

		
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
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
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						console.log("Secret: " + value);
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
