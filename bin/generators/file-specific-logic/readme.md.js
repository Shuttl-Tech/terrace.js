import v from 'voca';

export const processReadmeMd = ({ file, name }) => {
	file = file.split('\n');
	file[0] = `# ${v.titleCase(name)}`;
	file.splice(1, 2);
	return file.join('\n');
};
