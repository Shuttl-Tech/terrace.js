import fs from 'file-system';
import copy from 'recursive-copy';
import _fs from 'fs';
import CliProgress from 'cli-progress';
import { getProjectPaths, load, loadAllFiles } from './utils/files';
import { CriticalError } from './utils/error-handlers';
import { MISSING_ARGUMENT } from './utils/error-codes';
import { processPackageJson } from './file-specific-logic/package.json';
import { processReadmeMd } from './file-specific-logic/readme.md';
import { processGitIgnore } from './file-specific-logic/.extra.gitignore';
import { processDotEnv } from './file-specific-logic/.env';
import { trackGeneratorProgress } from './utils/cli-utils';
import { subdirFilesTransformer } from './utils/subdir-files-transformer';

let excludedPaths = [
	'.git',
	'node_modules',
	'.npmignore',
	'.extra.npmignore',
	'.header.gitignore',
	'bin',
	'yarn.lock',
	'.eslintignore',
	'terrace.log'
];

let excludedSpecialPaths = [
	'.DS_Store'
];

let excludedSubdirPaths = [];

export const createProject = async ({ name, withoutGithooks, withoutEslint, withoutI18n }) => {
	if (!name) CriticalError('🚨 Missing project name.', MISSING_ARGUMENT);

	if (withoutEslint) {
		excludedPaths = [...excludedPaths,
			'.eslintrc.js'
		];

		withoutGithooks = true;
	}

	if (withoutGithooks) {
		excludedPaths = [...excludedPaths,
			'.githooks'
		];
	}

	if (withoutI18n) {
		excludedSubdirPaths = [...excludedSubdirPaths,
			'src/i18n'
		];
	}

	let { source, destination } = getProjectPaths({ newProject: true });
	destination = `${destination}/${name}`;

	if (_fs.existsSync(destination)) {
		console.error(`Folder ${name} already exists at the current location.`);
		return;
	}

	fs.mkdirSync(destination);

	let files = loadAllFiles(`${source}/`).filter(file => {
		try {
			return ![...excludedPaths, ...excludedSpecialPaths].includes(file.file) && _fs.existsSync(file.full);
		}
		catch (e) {
			return false;
		}
	});

	let i = 0;
	let acceptedFilesLength = files.length;

	console.log('🛠 Creating Terrace project. 🛠');

	const progressBar = new CliProgress.Bar({}, CliProgress.Presets.shades_classic);
	progressBar.start(acceptedFilesLength, 0);

	for(let file of files) {
		let isDirectory = _fs.lstatSync(file.full).isDirectory();
		let _destination = isDirectory ? `${destination}/${file.file}/` : `${destination}/${file.file}`;

		if (isDirectory) {
			fs.mkdirSync(_destination);
			let options = {
				filter: name => Boolean(!excludedSubdirPaths.filter(excludePath => `${file.full}/${name}`.includes(excludePath)).length),
				transform: src => subdirFilesTransformer(src, { source, withoutI18n })
			};

			try {
				await copy(file.full, _destination, options);
				trackGeneratorProgress({ currentIndex: ++i, acceptedFilesLength, fileName: file.file, projectName: name, destination, source, progressBar, withoutGithooks, withoutEslint });
			}
			catch (err) { console.error(err); }
		}
		else {
			let _file = load(file.full);

			switch (file.file) {
				case '.env.development':
				case '.env.production':
					fs.writeFileSync(_destination, processDotEnv({ file: _file, name }));
					break;
				case 'package.json':
					fs.writeFileSync(_destination, processPackageJson({ file: JSON.parse(_file), withoutEslint, name, withoutI18n }));
					break;
				case 'README.md':
					fs.writeFileSync(_destination, processReadmeMd({ file: _file, name }));
					break;
				case '.extra.gitignore':
					_destination = `${destination}/.gitignore`;
					fs.writeFileSync(_destination, processGitIgnore({ file: _file }));
					file.file = '.gitignore';
					break;
				case '.terrace-cli':
					_file = JSON.parse(_file);
					_file.defaults.view.noIntl.use = withoutI18n;
					_file.defaults.component.noIntl.use = withoutI18n;
					_file = JSON.stringify(_file, null, '\t');
					fs.writeFileSync(_destination, _file);
					break;
				default: fs.writeFileSync(_destination, _file);
			}

			trackGeneratorProgress({ currentIndex: ++i, acceptedFilesLength, fileName: file.file, projectName: name, destination, source, progressBar, withoutGithooks, withoutEslint });
		}
	}
};
