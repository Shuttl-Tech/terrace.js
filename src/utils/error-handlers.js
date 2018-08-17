import { BAD_REQUEST } from 'http-status-codes';
import API from 'apis';	// eslint-disable-line

export const handleFailedResponses = (payload: Object, url: string) => {
	const ignoreUrls = [];
	if (!payload.success && ignoreUrls.includes(url)) throw BAD_REQUEST;
	return payload;
}
