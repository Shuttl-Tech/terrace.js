export interface Global {
	document: Document;
	window: Window;
	localStorage: Storage,
	sessionStorage: Storage,
	getTranslatedString: (...a: any[]) => any
}

declare var global: Global;
