import * as Handlebars from 'handlebars';
import { IbookPluginSettings } from '@/config';
import { RendererData } from '@/types';

export class Renderer {
	private settings: IbookPluginSettings;

	constructor(settings: IbookPluginSettings) {
		this.settings = settings;
	}

	public render(data: RendererData) {
		const source = this.settings.template;
		const template = Handlebars.compile(source);
		return template(data);
	}
}
