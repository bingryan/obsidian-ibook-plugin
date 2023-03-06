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

		new Setting(this.containerEl)
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
