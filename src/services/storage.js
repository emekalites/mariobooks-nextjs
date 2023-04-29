import Cookies from 'js-cookie';
import { decodeValue, encodeValue, isUnset } from '@/services/utilities';

export default class LocalStorage {
	constructor() {}

	setItem(key, value) {
		this.setCookie(key, value);
		this.setLocalStorage(key, value);
	}

	getItem(key) {
		let value = this.getCookie(key);
		if (isUnset(value)) {
			value = this.getLocalStorage(key);
		}
		return value;
	}

	removeItem(key) {
		this.removeCookie(key);
		this.removeLocalStorage(key);
	}

	// ------------------------------------
	// Cookie
	// ------------------------------------
	setCookie(key, value) {
		Cookies.set(key, encodeValue(value));
	}

	getCookie(key) {
		const value = Cookies.get(key);
		return decodeValue(value);
	}

	removeCookie(key) {
		Cookies.remove(key);
	}

	// ------------------------------------
	// Local storage
	// ------------------------------------
	setLocalStorage(key, value) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		try {
			localStorage.setItem(key, encodeValue(value));
		} catch (e) {}
	}

	getLocalStorage(key) {
		if (typeof localStorage === 'undefined') {
			return null;
		}

		const value = localStorage.getItem(key);
		return decodeValue(value);
	}

	removeLocalStorage(key) {
		if (typeof localStorage === 'undefined') {
			return;
		}

		localStorage.removeItem(key);
	}
}
