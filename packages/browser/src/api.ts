import {type Empty, type ApiResponse, type ApiSpecification} from 'types/out/api.js';

export type HttpMethods = 'GET' | 'POST';

export class PermissionError extends Error { }

export class InvalidBodyError extends Error { }

/**
 * Create fetcher interface with resource map.
 * @param prefix The prefix of API server url.
 * @returns A function with map of available resources on the API.
 */
export const createInterfaceByDataType = <Methods extends Record<string, ApiSpecification<unknown, ApiResponse<unknown>>>>(
	prefix: string,
) => async <
	ActionType extends keyof Methods & string,
	BodyType extends Methods[ActionType]['request']['body'],
	ResponseType extends Methods[ActionType]['response'][200],
>(action: ActionType, ...body: BodyType extends Empty ? [void?] : [BodyType]): Promise<ResponseType> => {
	const [method, uri] = action.split(' ') as [HttpMethods, string];

	const url = new URL(prefix + uri);
	const init: RequestInit = {
		method,
	};

	if (method === 'POST') {
		// Place undefined to optimize the common case
		if (typeof init.headers === 'undefined') {
			init.headers = {
				'content-type': 'application/json',
			};
		} else if (Array.isArray(init.headers)) {
			init.headers.push(['content-type', 'application/json']);
		} else if (typeof init.headers === 'object' && typeof init.headers.append === 'function') {
			init.headers.append('content-type', 'application/json');
		} else {
			(init.headers as Record<string, string | string[]>)['content-type'] = 'application/json';
		}

		init.body = JSON.stringify(body);
	}

	const response = await fetch(url, init);

	if (response.status === 200) {
		const json = await response.json() as ResponseType;

		return json;
	}

	if (response.status === 403) {
		throw new PermissionError('Lack of permission!');
	}

	if (response.status === 400) {
		throw new InvalidBodyError('Invalid request!');
	}

	throw new Error('Unknown error!');
};
