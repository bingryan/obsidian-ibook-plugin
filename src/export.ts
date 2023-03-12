import { Annotation } from "./types";
import { getAllBookId, getBookById, getAnnotationBookId } from "@/api";
import { IbookPluginSettings } from "@/config";
import { Renderer } from "@/renderer";
import { htmlToMarkdown } from "obsidian";

import IbookPlugin from "@/plugin";
import * as path from "path";
import { tryCreateFolder, removeTags } from "@/utils";

export interface IExport {
	start(): void;
}

export class IBookExport implements IExport {
	private settings: IbookPluginSettings;
	private renderer: Renderer;
	public plugin: IbookPlugin;
	constructor(settings: IbookPluginSettings, plugin: IbookPlugin) {
		this.settings = settings;
		this.renderer = new Renderer(this.settings);
		this.plugin = plugin;
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
					renderData.library.ZBOOKDESCRIPTION = htmlToMarkdown(
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
		const annotationList = await getAnnotationBookId(bookId);
		return {
			library: library[0],
			annotation: annotationList.map(this.formatAnnotation),
		};
	}

	formatAnnotation(annotation: Annotation) {
		return {
			...annotation,
			ZFUTUREPROOFING5: removeTags(annotation.ZFUTUREPROOFING5),
			ZANNOTATIONSELECTEDTEXT: removeTags(
				annotation.ZANNOTATIONSELECTEDTEXT
			),
			ZANNOTATIONNOTE: removeTags(annotation.ZANNOTATIONNOTE),
		};
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
}
