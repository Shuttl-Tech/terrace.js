export const processPackageJson = ({ file, withoutEslint, name, withoutI18n }) => {
  delete file.devDependencies['cli-progress'];
  delete file.devDependencies['colors'];
  delete file.devDependencies['emoji-regex'];
  delete file.devDependencies['file-system'];
  delete file.devDependencies['pluralize'];
  delete file.devDependencies['readline-sync'];
  delete file.devDependencies['recursive-copy'];
  delete file.devDependencies['through2'];
  delete file.devDependencies['yargs'];

  if (withoutEslint) {
  	delete file.devDependencies['babel-eslint'];
  	delete file.devDependencies['eslint'];
  	delete file.devDependencies['eslint-config-react-app'];
  	delete file.devDependencies['eslint-plugin-flowtype'];
  	delete file.devDependencies['eslint-plugin-import'];
  	delete file.devDependencies['eslint-plugin-jsx-a11y'];
  	delete file.devDependencies['eslint-plugin-react'];
  	delete file.devDependencies['@typescript-eslint/eslint-plugin'];
  	delete file.devDependencies['@typescript-eslint/parser'];
  	delete file.devDependencies['eslint-plugin-react-hooks'];
  }

  if (withoutI18n) {
  	delete file.dependencies['i18next'];
  	delete file.dependencies['i18next-browser-languagedetector'];
  	delete file.dependencies['react-i18next'];
  }

  delete file.dependencies['ramda'];
  delete file.dependencies['voca'];

  delete file.scripts['write-npmignore'];
  delete file.scripts['prepare'];
  delete file.scripts['build-bin'];
  delete file.scripts['write-gitignore-extra'];
  delete file.scripts['preupdate'];

  file.scripts['start'] = file.scripts['original-start'];
  delete file.scripts['original-start'];

  delete file.repository;
  delete file.author;
  delete file.bin;
  file.name = name;
  file.private = true;
  file.version = '0.1.0';

  return JSON.stringify(file, null, '\t');
};
