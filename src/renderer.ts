import * as handlebars from 'handlebars';
import { IbookPluginSettings } from '@/config';
import { RendererData } from '@/types';
import helpers from 'handlebars-helpers';
import groupBy from 'handlebars-group-by';

export class Renderer {
	private settings: IbookPluginSettings;

	constructor(settings: IbookPluginSettings) {
		this.settings = settings;
	}

	public render(data: RendererData) {
		const source = this.settings.template;
		handlebars.registerHelper(groupBy(handlebars));
		handlebars.registerHelper(helpers(handlebars));
		const template = handlebars.compile(source);
		return template(data);
	}
}
