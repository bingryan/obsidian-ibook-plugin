import IbookPlugin from "@/plugin";
import {
	App,
	PluginSettingTab,
	Setting,
} from "obsidian";

export class IbookSettingTab extends PluginSettingTab {
	plugin: IbookPlugin;

	constructor(app: App, plugin: IbookPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl("h1", { text: "Obsidian ibook" });
		containerEl.createEl("p", { text: "Created by " }).createEl("a", {
			text: "bingryan 🤓",
			href: "https://github.com/bingryan",
		});
		containerEl.createEl("h2", { text: "Obsidian ibook Settings" });


		new Setting(containerEl)
			.setName("Custom default output path")
			.setDesc("default directory for ibook note export")
			.addText((text) =>
				text
					.setPlaceholder("Enter default output path")
					.setValue(this.plugin.settings.output)
					.onChange(async (value) => {
						this.plugin.settings.output = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Not export no annotation book")
			.setDesc(
				"When the book has no annotations, it will not be exported"
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.notExportNoAnnotation)
					.onChange(async (value: boolean) => {
						this.plugin.settings.notExportNoAnnotation = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("backup old export markdown when exist")
			.setDesc(
				"if a export book with the same name is found, the previous export markdown will be backed up: bookname.md -> bookname.bk.time.md"
			)
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.backupWhenExist)
					.onChange(async (value: boolean) => {
						this.plugin.settings.backupWhenExist = value;
						await this.plugin.saveSettings();
					})
			);
		new Setting(containerEl)
			.setName('template')
			.setClass("ibook-template-item")
			.addTextArea((text) => {
				text.inputEl.style.width = '100%';
				text.inputEl.style.height = '480px';
				text.inputEl.style.overflow = 'auto';
				text.setValue(this.plugin.settings.template).onChange(async (value) => {
					this.plugin.settings.template = value;
					await this.plugin.saveSettings();
				});
				return text;
			});
	}

}
