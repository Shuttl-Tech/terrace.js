import { setSessionToken, refreshSessionToken, TOKEN_COOKIE_NAME } from '../session';
import cookie from 'js-cookie';

it('sets and updates session token', () => {
	const oldCookie = 'some-token';
	const newCookie = 'some-new-token';
	setSessionToken(oldCookie);
	expect(cookie.get(TOKEN_COOKIE_NAME)).toEqual(oldCookie);

	refreshSessionToken(newCookie);
	expect(cookie.get(TOKEN_COOKIE_NAME)).toEqual(newCookie);
});
