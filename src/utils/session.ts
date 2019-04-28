import cookie from 'js-cookie';

export const TOKEN_COOKIE_NAME = 'authToken';

export function refreshSessionToken(token: string) {
	cookie.remove(TOKEN_COOKIE_NAME);
	setSessionToken(token);
}

export function setSessionToken(token: string) {
	cookie.set(TOKEN_COOKIE_NAME, token, { expires: 7 });
}

export function getSessionToken() {
	return cookie.get(TOKEN_COOKIE_NAME);
}
