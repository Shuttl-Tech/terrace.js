const ls = require('ls');
const fs = require('file-system');
const ncp = require('ncp').ncp;
ncp.limit = 16;

const excludedPaths = [
	'.git',
	'node_modules',
	'.npmignore',
	'.extra.npmignore',
	'bin',
	'yarn.lock'
];

module.exports = async ({ name }) => {
	if (!name) throw new Error('Missing project name.');

	let source = `${__dirname}/../`;
	let destination = `${process.cwd()}/${name}`;

	if (fs.existsSync(destination)) {
		console.error(`Folder ${name} already exists at the current location.`);
		return;
	}

	fs.mkdirSync(destination);

	let i = 1;
	let files = loadAllFiles(source);
	let acceptedFilesLength = files.length - excludedPaths.length;

	for(let file of files) {
		if (!file || excludedPaths.includes(file.file)) continue;

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
