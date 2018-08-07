import { session } from 'storage.io';

const requestCachePrefix = 'request-cache-';

export function cache(url: string, data: Object): boolean {
	return session.set(`${requestCachePrefix}${url}`, data);
}

export function load(url: string): boolean {
	return session.get(`${requestCachePrefix}${url}`);
}

export function clear(url: string): boolean {
	return session.remove(`${requestCachePrefix}${url}`);
}

export function purge(): boolean {
	return session.clear();
}
