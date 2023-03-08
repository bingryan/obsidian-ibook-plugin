import { getAllBookId, getBookById, getAnnotationBookId } from "@/api";
import { IbookPluginSettings } from "@/config";
import { Renderer } from "@/renderer";
import TurndownService from "turndown";

import IbookPlugin from "@/plugin";
import * as path from "path";
import { tryCreateFolder } from "@/utils";

export interface IExport {
	start(): void;
}

export class IBookExport implements IExport {
	private settings: IbookPluginSettings;
	private renderer: Renderer;
	public plugin: IbookPlugin;

	private turndownService: TurndownService;
	constructor(settings: IbookPluginSettings, plugin: IbookPlugin) {
		this.settings = settings;
		this.renderer = new Renderer(this.settings);
		this.plugin = plugin;
		this.turndownService = new TurndownService();
	}

	/**
	 * During the develop, the following problems will be found
	1. ZAEANNOTATION has data, but ZBKLIBRARYASSET has no book information	
	2. LibraryAsset.ZBOOKDESCRIPTION is HTML, but we want is markdown
	
	*/
	async start() {
		await tryCreateFolder(this.plugin, this.settings.output);

		const getBookId = await getAllBookId();

		if (getBookId.length > 0) {
			for (let i = 0; i < getBookId.length; i++) {
				const renderData = await this.getRenderDataById(
					getBookId[i].ZASSETID
				);

				if (
					renderData.annotation.length === 0 ||
					renderData.library.ZTITLE === null
				) {
					continue;
				}

				/// ZBOOKDESCRIPTION: Convert HTML to markdown
				if (renderData.library.ZBOOKDESCRIPTION !== null) {
					renderData.library.ZBOOKDESCRIPTION = this.html3markdown(
						renderData.library.ZBOOKDESCRIPTION
					);
				}

				const content = this.renderer.render(renderData);
				this.save(renderData.library.ZTITLE, content);
			}
		}
	}

	async getRenderDataById(bookId: string) {
		const library = await getBookById(bookId);
		const annotation = await getAnnotationBookId(bookId);
		return { library: library[0], annotation: annotation };
	}

	save(contentName: string, content: string) {
		try {
			this.plugin.app.vault.create(
				path.join(this.plugin.settings.output, `${contentName}.md`),
				content
			);
		} catch (error) {
			if (!error.message.contains("file already exists")) {
				throw error;
			}
		}
	}
	html3markdown(html: string) {
		return this.turndownService.turndown(html);
	}
}
