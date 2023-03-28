import { requestUrl, RequestUrlParam, Notice } from "obsidian";

export class Fetch {
	static async get<T>(url: string, options?: RequestUrlParam): Promise<T[]> {
		const requestUrlParam = {
			url: url,
			method: "GET",
			throw: true,
			...options,
		};
		return requestUrl(requestUrlParam)
			.then(resp => {
				if (resp.status >= 400) {
					new Notice("access server error");
				}

				console.log("resp: ", resp);
				return resp.text;
			})
			.then(JSON.parse)
			.catch(error => {
				throw error;
			});

	}
}