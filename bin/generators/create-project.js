import fs from 'file-system';
import { ncp } from 'ncp';
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

ncp.limit = 16;

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

export const createProject = async ({ name, withoutGithooks, withoutEslint }) => {
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
			ncp(file.full, _destination, function (err) {
				if (err) return console.error(err);
				trackGeneratorProgress({ currentIndex: ++i, acceptedFilesLength, fileName: file.file, projectName: name, destination, source, progressBar, withoutGithooks, withoutEslint });
			});
		}
		else {
			let _file = load(file.full);

			switch (file.file) {
				case '.env.development':
				case '.env.production':
					fs.writeFileSync(_destination, processDotEnv({ file: _file, name }));
					break;
				case 'package.json':
					fs.writeFileSync(_destination, processPackageJson({ file: JSON.parse(_file), withoutEslint, name }));
					break;
				case 'README.md':
					fs.writeFileSync(_destination, processReadmeMd({ file: _file, name }));
					break;
				case '.extra.gitignore':
					_destination = `${destination}/.gitignore`;
					fs.writeFileSync(_destination, processGitIgnore({ file: _file }));
					file.file = '.gitignore';
					break;
				default: fs.writeFileSync(_destination, _file);
			}

			trackGeneratorProgress({ currentIndex: ++i, acceptedFilesLength, fileName: file.file, projectName: name, destination, source, progressBar, withoutGithooks, withoutEslint });
		}
	}
};
