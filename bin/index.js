const yargs = require('yargs');
const createProject = require('./create-project');

// noinspection JSUnusedLocalSymbols
let argv = yargs.usage('$0 [args]')
	.command('create [name]', 'Creates a loaded-up CRA project', (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Name of your project'
		});
	}, createProject)
	.help()
	.demandCommand()
	.argv;
