import { FuzzySuggestModal, App, Editor, Notice } from "obsidian";
import { LibraryAsset, GoodReadBook } from "@/types";
import IbookPlugin from "@/plugin";


abstract class IbookFuzzySuggestModal extends FuzzySuggestModal<LibraryAsset> {
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

export class IBookSearchModal extends IbookFuzzySuggestModal {
	constructor(app: App, plugin: IbookPlugin) {
		super(app, plugin);

		this.setInstructions([
			{
				command: "↵",
				purpose: "to export selected book to a note",
			},
			{ command: "esc", purpose: "to dismiss" },
		]);
		this.setPlaceholder("Search by Book's Title or Author");
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


export class GoodReadBookFuzzySuggestModal extends FuzzySuggestModal<GoodReadBook> {
	plugin: IbookPlugin;
	emptyStateText: string;
	limit: number;
	items: GoodReadBook[];
	constructor(
		app: App,
		plugin: IbookPlugin,
		private readonly editor: Editor,
		items: GoodReadBook[],
		emptyStateText = "",
		limit = 20
	) {
		super(app);
		this.plugin = plugin;
		this.emptyStateText = emptyStateText;
		this.limit = limit;
		this.items = items;
		// TODO: add custom css

		this.setInstructions([
			{
				command: "↵",
				purpose: "insert book info at current cursor position",
			},
			{ command: "esc", purpose: "to dismiss" },
		]);
		this.setPlaceholder("Search by Book's info via goodreads");
	}
	onOpen() {
		super.onOpen();
	}

	getItems(): GoodReadBook[] {
		return Object.values(this.items);
	}
	getItemText(item: GoodReadBook): string {
		return `${item.title}-${item.author.name}`;
	}
	onChooseItem(item: GoodReadBook, evt: MouseEvent | KeyboardEvent): void {
		if (evt instanceof MouseEvent || evt.key == "Enter") {
			this.editor.replaceSelection(JSON.stringify(item));
		}
	}
}
