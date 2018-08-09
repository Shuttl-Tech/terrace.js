const { spawnSync } = require('child_process');
const ls = require('ls');
const fs = require('file-system');
const _fs = require('fs');
const { ncp } = require('ncp');
ncp.limit = 16;

const excludedPaths = [
	'.git',
	'node_modules',
	'.npmignore',
	'.extra.npmignore',
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

	console.log('>>>>', source, loadAllFiles(source));
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
			fs.writeFileSync(_destination, _file);
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
