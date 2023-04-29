import { API_URI, TOKEN_COOKIE } from '@/services/constants';
import LocalStorage from '@/services/storage';

export const isUnset = (o) => typeof o === 'undefined' || o === null;

export function encodeValue(val) {
	if (typeof val === 'string') {
		return val;
	}

	return JSON.stringify(val);
}

export function decodeValue(val) {
	if (typeof val === 'string') {
		try {
			return JSON.parse(val);
		} catch (_) {}
	}

	return val;
}

const checkStatus = async (response) => {
	if (!response.ok) {
		if (response.statusText === 'Unauthorized') {
			// prettier-ignore
			const token = (new LocalStorage()).getItem(TOKEN_COOKIE);
			if (token) {
				// prettier-ignore
				(new LocalStorage()).removeItem(TOKEN_COOKIE);

				window.location.reload();
			}
		}
		const message = await response.text();
		const err = JSON.parse(message);
		throw Object.freeze({ message: err.message || err.error });
	}

	return response;
};

const parseJSON = (response) => response.json();

export async function request(uri, { body, ...customConfig } = {}) {
	let headers = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};

	// prettier-ignore
	const token = (new LocalStorage()).getItem(TOKEN_COOKIE);

	if (token) {
		const jwt = `Bearer ${token}`;
		headers = customConfig.uploader
			? { Authorization: jwt }
			: { ...headers, Authorization: jwt };
	}

	const config = {
		method: body ? 'POST' : 'GET',
		...customConfig,
		headers: { ...headers },
	};

	if (body) {
		config.body = customConfig.uploader ? body : JSON.stringify(body);
	}

	const response = await fetch(`${API_URI}/${uri}`, config);
	const result = await checkStatus(response);

	return parseJSON(result);
}

export function updateImmutable(list, payload) {
	const data = list.find((d) => d.id === payload.id);
	if (data) {
		const index = list.findIndex((d) => d.id === payload.id);

		return [
			...list.slice(0, index),
			{ ...data, ...payload },
			...list.slice(index + 1),
		];
	}

	return list;
}

export function formatCurrency(amount, abs) {
	return `₦${(abs ? Math.abs(amount || 0) : amount).toLocaleString()}`;
}

export function reference() {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 10; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}
