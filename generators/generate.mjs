import yargs from 'yargs';

import './prototype-extensions';
import { generateView } from './generate-view';
import { generateComponent } from './generate-component';

// noinspection JSUnusedLocalSymbols
let argv = yargs.usage('$0 [args]')
	.command('view [name]', 'Generate a view', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Creates a view with the given name'
		});
	}, generateView)
	.command('component [name]', 'Generate a component', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Creates a component with the given name'
		});
	}, generateComponent)
  .option('reducer-name', {
    alias: 'r',
		default: false,
		describe: 'Specify reducer name.\nIf not provided, the default names will be the lowercase view name suffixed with `-{actions,reducer,tasks}.js`\nWorks only with the `view` command.'
  })
	.help()
	.demandCommand()
	.argv;
