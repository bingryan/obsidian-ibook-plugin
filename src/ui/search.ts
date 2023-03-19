import { FuzzySuggestModal, App, Notice } from "obsidian";

import { LibraryAsset } from "@/types";
import IbookPlugin from "@/plugin";

class SearchModal extends FuzzySuggestModal<LibraryAsset> {
	plugin: IbookPlugin;
	emptyStateText: string;
	limit: number;
	constructor(
		app: App,
		plugin: IbookPlugin,
		emptyStateText = "",
		limit = 20
	) {
		super(app);
		this.plugin = plugin;
		this.emptyStateText = emptyStateText;
		this.limit = limit;
		// TODO: add custom css
	}
	onOpen() {
		super.onOpen();
	}

	getItems(): LibraryAsset[] {
		return Object.values(this.plugin.bookLibrary);
	}
	getItemText(item: LibraryAsset): string {
		return `${item.ZTITLE}-${item.ZAUTHOR}`;
	}
	onChooseItem(item: LibraryAsset, evt: MouseEvent | KeyboardEvent): void {
		console.log("onChooseItem: ", item);
	}
}

export class BookSearchModal extends SearchModal {
	constructor(app: App, plugin: IbookPlugin) {
		super(app, plugin);

		this.setInstructions([
			{
				command: "↵",
				purpose: "to export select book note",
			},
			{ command: "esc", purpose: "to dismiss" },
		]);
		this.setPlaceholder("Search by book's title or author");
	}

	onChooseItem(item: LibraryAsset, evt: MouseEvent | KeyboardEvent): void {
		if (evt instanceof MouseEvent || evt.key == "Enter") {
			this.plugin.export.generate(item.ZASSETID);
			new Notice(
				`Exporting Book: 《${item.ZTITLE}》 to ${this.plugin.settings.output}`
			);
		} else if (evt.key == "Tab") {
			// TODO: open by ibook
			open(item.ZPATH);
		}
	}
}
