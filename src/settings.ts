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
		containerEl.createEl("h1", { text: "Obsidian iBooks Plugin" });
		containerEl.createEl("p", { text: "Created by " }).createEl("a", {
			text: "bingryan 🤓",
			href: "https://github.com/bingryan",
		});
		containerEl.createEl("h2", { text: "Settings" });


		new Setting(containerEl)
			.setName("Custom Default Highlight Path")
			.setDesc("Highlights and Notes will be placed here.")
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
			.setName("Omit books with zero annotations")
			.setDesc(
				"When a book has no annotations, note will not be created"
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
			.setName("Backup old highlights if they exist")
			.setDesc(
				"If any previously imported highlights .md exist, they will be backed up as: bookname.md -> bookname.bk.time.md"
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
