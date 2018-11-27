import { spawn, spawnSync } from 'child_process';
import { getProjectPaths, load } from '../utils/files';
import { box } from './cli-box';

export const trackGeneratorProgress = ({ currentIndex, acceptedFilesLength, fileName, projectName, destination, source, progressBar, withoutGithooks, withoutEslint }) => {
	if (currentIndex < acceptedFilesLength) {
		progressBar.increment();
	}
	else {
		progressBar.update(acceptedFilesLength);
		progressBar.stop();

		let postInstallArgs = [`${source}/bin/post-install.sh`, `--destination=${destination}`];

		if (withoutGithooks) {
			postInstallArgs = [...postInstallArgs, '--without-githooks'];
		}

		let postInstall = spawn('bash', postInstallArgs, { stdio: 'inherit' });
		postInstall.on('close', (code) => {
			if (code === 0) installCompleteHandler({ projectName, destination, withoutGithooks, withoutEslint });
		});
	}
};

export const injectTerraceCliOptions = (handler, ...[args]) => {
	let { destination } = getProjectPaths();
	let terraceCliFile = JSON.parse(load(`${destination}/.terrace-cli`));

	let [ command ] = args._;
	let { ignoreDefaults } = args;

	if (ignoreDefaults) {
		handler({...args});
		return;
	}

	let _defaults = terraceCliFile.defaults[command] || {};
	let defaults = {};
	Object.keys(_defaults).forEach(key => {
		if (_defaults[key].use) defaults[key] = _defaults[key].value;
	});

	handler({...args, ...defaults});
};

export const getTerraceVersion = ({ boxFormatted = false } = {}) => {
	let { source } = getProjectPaths({ newProject: true });
	let terraceVersion = JSON.parse(load(`${source}/package.json`)).version;
	let majorMinorVersion = terraceVersion.split('.').slice(0, -1).join('.');
	let versionName = JSON.parse(load(`${source}/bin/generators/utils/version-names.json`))[majorMinorVersion];
	return boxFormatted ? `#bg^${versionName}#^ #xc^${terraceVersion}#^` : `${versionName.bold.green} ${terraceVersion.cyan}`;
};

export const installCompleteHandler = ({ projectName, destination, withoutGithooks, withoutEslint }) => {
	box({ message: `🎉 Enjoy your terrace at ${projectName}! 🎉` });
	if (!withoutEslint) {
		box({ message: `💡 Your project has been configured with #bc^eslint#^.\n` +
				`👉 Run it with 'yarn eslint .'\n` +
				`❓ Don't want the extra eslint? ❓\n` +
				`🤷‍♀️ You can choose to not use it without affecting your work,\n   or remove and create the terrace project\n   with the '--without-eslint' option. 🤷‍♂️`});
	}
	if (!withoutGithooks) {
		box({ message: `💡 Your project has been configured with #by^terrace's githooks#^.\n` +
				`👉 See the .githooks folder to see the list of githooks added.\n` +
				`❓ Don't want any preconfigured githooks? ❓\n` +
				`🤷‍♀️ Remove the .githooks folder. \n   You can create the .githooks folder and add githooks to it later.\n   You can also use the '--without-githooks' option next time. 🤷‍♂️`});
	}

	spawnSync(process.env.SHELL, ['-i'], {
		cwd: destination,
		stdio: 'inherit'
	});
};
