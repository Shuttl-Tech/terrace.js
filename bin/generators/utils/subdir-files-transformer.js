import through from 'through2';
import { parseTemplateComments } from './template-comments-parser';

export const subdirFilesTransformer = (src, { source, withoutI18n }) => {
	const subdirFileName = src.slice(source.length + 1, src.lastIndexOf('.'));
	let file;
	return through((chunk, enc, done) => {
		file = chunk.toString();

		// File names without extensions
		switch (subdirFileName) {
			case 'src/index':
			case 'src/setupTests':
			case 'src/views/Home/index':
			case 'src/components/ParametrizedView/index':
			case 'src/views/Home/__tests__/index.test':
				file = parseTemplateComments({ tokens: ['with-i18n'], file, invert: withoutI18n });
				break;
			default: break;
		}
		done(null, file);
	});
};
