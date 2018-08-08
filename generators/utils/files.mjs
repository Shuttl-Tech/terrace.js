import fs from 'file-system';

export const load = (path) => {
	return fs.readFileSync(path).toString();
};

export const save = (path, data) => {
	fs.writeFileSync(path, data);
};
