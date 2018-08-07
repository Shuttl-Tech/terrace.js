import cookie from 'js-cookie';

export const TOKEN_COOKIE_NAME = 'authToken';

export function refreshSessionToken(token) {
	cookie.remove(TOKEN_COOKIE_NAME);
	setSessionToken(token);
}

export function setSessionToken(token) {
	cookie.set(TOKEN_COOKIE_NAME, token, { expires: 7 });
}
