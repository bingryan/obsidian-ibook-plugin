import { Annotation } from "@/types";
import { getAllBookId, getBookById, getAnnotationBookId } from "@/api/ibook";
import { IbookPluginSettings } from "@/config";
import { Renderer } from "@/renderer";
import { htmlToMarkdown, normalizePath } from "obsidian";

import IbookPlugin from "@/plugin";
import * as path from "path";
import { tryCreateFolder, removeTags, htmlDecode } from "@/utils/misc";

export interface IExport {
	all(): void;
	generate(assetId: string): void;
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
	async all() {
		await tryCreateFolder(this.plugin, this.settings.output);

		const getBookId = await getAllBookId();

		if (getBookId.length > 0) {
			for (let i = 0; i < getBookId.length; i++) {
				await this.generate(getBookId[i].ZASSETID);
			}
		}
	}

	async generate(assetId: string) {
		const renderData = await this.getRenderDataById(assetId);

		if (
			renderData.annotation.length === 0 ||
			renderData.library.ZTITLE === null
		) {
			return;
		}

		/// ZBOOKDESCRIPTION: Convert HTML to markdown
		if (renderData.library.ZBOOKDESCRIPTION !== null) {
			renderData.library.ZBOOKDESCRIPTION = htmlToMarkdown(
				renderData.library.ZBOOKDESCRIPTION
			);
		}

		/// fix: #36
		if (renderData.library.ZTITLE !== null) {
			renderData.library.ZTITLE = htmlDecode(
				renderData.library.ZTITLE
			);
			renderData.library.ZSORTTITLE = htmlDecode(
				renderData.library.ZSORTTITLE
			);
		}
		const content = this.renderer.render(renderData);
		this.save(renderData.library.ZTITLE, content);
	}

	async getRenderDataById(bookId: string) {
		const library = await getBookById(bookId);
		const annotationList = await getAnnotationBookId(
			bookId,
			this.settings.notExportNoAnnotation
		);
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

	async save(contentName: string, content: string) {
		const fileName = `${contentName}`
			.replace(/:/g, '-')
			.replace(/(\r\n|\n|\r|\/|\\\\)/gm, "-")
		try {
			const filePath = normalizePath(path.join(this.plugin.settings.output, `${fileName}.md`));
			const isExist = await this.plugin.app.vault.adapter.exists(filePath);
			if (this.plugin.settings.backupWhenExist && isExist) {
				// backup file if file already exists
				// issue: #44
				const backupPath = normalizePath(path.join(this.plugin.settings.output, `${fileName}-bk-${Date.now()}.md`));
				this.plugin.app.vault.adapter.rename(filePath, backupPath);
			}
			this.plugin.app.vault.create(
				path.join(this.plugin.settings.output, `${fileName}.md`),
				content
			);
		} catch (error) {
			if (!error.message.contains("file already exists")) {
				throw error;
			}
		}
	}
}
