const { spawnSync } = require('child_process');
const ls = require('ls');
const fs = require('file-system');
const _fs = require('fs');
const v = require('voca');
const { ncp } = require('ncp');
ncp.limit = 16;

const excludedPaths = [
	'.git',
	'node_modules',
	'.npmignore',
	'.extra.npmignore',
	'.header.gitignore',
	'bin',
	'yarn.lock'
];

const excludedSpecialPaths = [
	'.DS_Store'
];

module.exports = async ({ name }) => {
	if (!name) throw new Error('Missing project name.');

	let destination = `${process.cwd()}/${name}`;
	let terracePackage = spawnSync('which', ['terrace']).stdout.toString().slice(0, -1);
	let source = _fs.realpathSync(terracePackage).split('/').slice(0, -2).join('/') + '/';

	if (fs.existsSync(destination)) {
		console.error(`Folder ${name} already exists at the current location.`);
		return;
	}

	fs.mkdirSync(destination);

	let i = 1;
	let files = loadAllFiles(source).filter(file => {
		try {
			return ![...excludedPaths, ...excludedSpecialPaths].includes(file.file) && fs.existsSync(file.full);
		}
		catch (e) {
			return false;
		}
	});

	let acceptedFilesLength = files.length;

	for(let file of files) {
		let isDirectory = fs.lstatSync(file.full).isDirectory();
		let _destination = isDirectory ? `${destination}/${file.file}/` : `${destination}/${file.file}`;

		if (isDirectory) {
			fs.mkdirSync(_destination);
			ncp(file.full, _destination, function (err) {
				if (err) return console.error(err);
				console.log(`Added ${i++}/${acceptedFilesLength} ${file.file}`);
			});
		}
		else {
			let _file = fs.readFileSync(file.full).toString();
			let processedFile, jsonFile, mdFile, txtFile;

			switch (file.file) {
				case 'package.json':
					jsonFile = JSON.parse(_file);
					delete jsonFile.devDependencies['ncp'];
					delete jsonFile.scripts['write-npmignore'];
					delete jsonFile.scripts['prepare'];
					delete jsonFile.scripts['build-bin'];
					delete jsonFile.scripts['write-gitignore-extra'];
					delete jsonFile.scripts['preupdate'];
					delete jsonFile.repository;
					delete jsonFile.author;
					delete jsonFile.bin;
					jsonFile.name = name;
					jsonFile.private = true;
					jsonFile.version = '0.1.0';

					processedFile = JSON.stringify(jsonFile, null, '\t');
					fs.writeFileSync(_destination, processedFile);
					break;
				case 'README.md':
					mdFile = _file.split('\n');
					mdFile[0] = `# ${v.titleCase(name)}`;
					mdFile.splice(1, 2);
					processedFile = mdFile.join('\n');
					fs.writeFileSync(_destination, processedFile);
					break;
				case '.extra.gitignore':
					_destination = `${destination}/.gitignore`;
					txtFile = _file.split('\n');
					txtFile.splice(0, 2);
					processedFile = txtFile.join('\n');
					fs.writeFileSync(_destination, processedFile);
					file.file = '.gitignore';
					break;
				default: fs.writeFileSync(_destination, _file);
			}

			console.log(`Added ${i++}/${acceptedFilesLength} ${file.file}`);
		}

		if (i > acceptedFilesLength) {
			console.log(`🎉 Enjoy your terrace at ${name}! 🎉`);
		}
	}
};

function loadAllFiles(path) {
	return [...ls(path + '.*'), ...ls(path + '*')];
}
