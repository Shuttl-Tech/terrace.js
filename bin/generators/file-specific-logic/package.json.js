export const processPackageJson = ({ file, withoutEslint, name }) => {
	delete file.devDependencies['cli-progress'];
	delete file.devDependencies['colors'];
	delete file.devDependencies['emoji-regex'];
	delete file.devDependencies['file-system'];
	delete file.devDependencies['ncp'];
	delete file.devDependencies['pluralize'];
	delete file.devDependencies['readline-sync'];
	delete file.devDependencies['strip-json-comments'];
	delete file.devDependencies['yargs'];

	if (withoutEslint) {
		delete file.devDependencies['babel-eslint'];
		delete file.devDependencies['eslint'];
		delete file.devDependencies['eslint-config-react-app'];
		delete file.devDependencies['eslint-plugin-flowtype'];
		delete file.devDependencies['eslint-plugin-import'];
		delete file.devDependencies['eslint-plugin-jsx-a11y'];
		delete file.devDependencies['eslint-plugin-react'];
	}

	delete file.scripts['write-npmignore'];
	delete file.scripts['prepare'];
	delete file.scripts['build-bin'];
	delete file.scripts['write-gitignore-extra'];
	delete file.scripts['preupdate'];
	delete file.repository;
	delete file.author;
	delete file.bin;
	file.name = name;
	file.private = true;
	file.version = '0.1.0';

	return JSON.stringify(file, null, '\t');
};
