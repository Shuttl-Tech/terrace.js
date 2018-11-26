import through from 'through2';
import { parseTemplateComments } from './template-comments-parser';

export const subdirFilesTransformer = (src, { source, withoutI18n }) => {
	const subdirFileName = src.slice(source.length + 1);
	let file;
	return through((chunk, enc, done) => {
		file = chunk.toString();
		switch (subdirFileName) {
			case 'src/setupTests.js':
			case 'src/views/Home/index.js':
			case 'src/components/ParametrizedView/index.js':
			case 'src/views/Home/__tests__/index.test.js':
				file = parseTemplateComments({ tokens: ['with-i18n'], file, invert: withoutI18n });
				break;
			default: break;
		}
		done(null, file);
	});
};
