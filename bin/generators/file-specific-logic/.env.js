export const processDotEnv = ({ file, name }) => {
	file = file.split('\n').map(line => {
		let [key, value] = line.split('=');

		switch (key) {
			case 'REACT_APP_PROJECT_NAME': value = `'${name}'`; break;
			default: break;
		}

		return `${key}=${value}`;
	});
	return file.join('\n');
};
