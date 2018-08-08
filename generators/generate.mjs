import yargs from 'yargs';

import './prototype-extensions.mjs';
import { generateView } from './generate-view.mjs';

let argv = yargs.usage('$0 [args]')
	.command('view [name]', 'Generate a view', (yargs) => {
		// console.log(yargs.argv)
		yargs.positional('name', {
			type: 'string',
			describe: 'Creates a view with the given name'
		});
	}, generateView)
  .option('reducer-name', {
    alias: 'r',
		default: false,
		describe: 'Specify reducer name.\nIf not provided, the default names will be the lowercase view name suffixed with `-{actions,reducer,tasks}.js`'
  })
	.help()
	.demandCommand()
	.argv;
