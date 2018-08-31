export const processGitIgnore = ({ file }) => {
	let txtFile = file.split('\n');
	txtFile.splice(0, 2);
	return txtFile.join('\n');
};
