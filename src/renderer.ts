import * as handlebars from 'handlebars';
import { IbookPluginSettings } from '@/config';
import { RendererData } from '@/types';
import helpers from 'handlebars-helpers';
import groupBy from 'handlebars-group-by';
import moment from 'moment';

export class Renderer {
	private settings: IbookPluginSettings;

	constructor(settings: IbookPluginSettings) {
		this.settings = settings;
	}

	public render(data: RendererData) {
		const source = this.settings.template;
		handlebars.registerHelper(groupBy(handlebars));
		handlebars.registerHelper(helpers(handlebars));
		handlebars.registerHelper("dateFormat", (date, format, utc) => {
			// issue: https://github.com/bingryan/obsidian-ibook-plugin/issues/53
			const cocoaOffset = 978307200;
			if (typeof date === 'string') {
				date = parseInt(date);
			}
			const dateTime = moment.unix(date + cocoaOffset);
			return (utc === true) ? dateTime.utc().format(format) : dateTime.format(format);
		});

		const template = handlebars.compile(source);
		return template(data);
	}
}
