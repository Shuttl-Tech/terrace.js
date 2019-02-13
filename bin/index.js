import yargs from 'yargs';
import 'colors';

import { createProject } from './generators/create-project';
import { generateView } from './generators/generate-view';
import { generateComponent } from './generators/generate-component';
import { generateMock } from './generators/generate-mock';
import { removeEntity } from './generators/remove-entity';
import { injectTerraceCliOptions, getTerraceVersion } from './generators/utils/cli-utils';
import { box } from './generators/utils/cli-box';

import './generators/prototype-extensions';

// noinspection JSUnusedLocalSymbols
let argv = yargs
	.usage(box(
		{
			asText: true,
			message:
				'#ac^Terrace#^\n' +
				`${getTerraceVersion({ boxFormatted: true })}\n` +
				'Usage: terrace [args]\n' +
				'#xg^A command line tool to create a create-react-app project for you,#^\nwith a bunch of pre-installed utilities to make your life easier. 🎉🎉\n' +
				'#xg^ℹ️  Terrace provides a bunch of utilities and packages by default#^\nthat you\'re free to remove if you prefer.'
			}
		)
	)
	.command('create [name]', 'Creates a loaded-up CRA project'.blue, (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Name of your project'
		})
		.option('without-githooks', {
			alias: 'g',
			default: false,
			type: 'boolean',
			describe: 'Create project without adding any ' + 'terrace githooks'.bold.green + '.\nBy default, the '.green + 'githooks will be included'.green.bold + ' and configured.'.green
		})
		.option('without-eslint', {
			alias: 'e',
			default: false,
			type: 'boolean',
			describe: 'Create project without adding any ' + 'extra eslint config'.bold.green + '.' + '\nWhen this option is passed, githooks are automatically ignored because of current implementation logic.'.yellow
		})
		.option('without-i18n', {
			alias: 'i',
			default: false,
			type: 'boolean',
			describe: 'Create project without adding any ' + 'i18n support'.bold.green + '.' + '\nBy default, i18n packages and code would be added.'.yellow
		});
	}, createProject)
	.command('view [name]', 'Generate a view'.cyan, (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Creates a view with the given name'
		})
		.option('reducer-name', {
			alias: 'r',
			default: false,
			describe: 'Specify reducer name.'.bold.green + '\nIf not provided, the default names will be the lowercase view name suffixed with `-{actions,reducer,tasks}.js`.'
		})
		.option('without-reducer', {
			alias: 'w',
			default: false,
			type: 'boolean',
			describe: 'Create a view ' + 'without a reducer'.bold.green + ', tasks, actions, and reducer test.'
		})
		.option('no-intl', {
			alias: 'i',
			default: false,
			type: 'boolean',
			describe: 'Create a view ' + 'without i18n support'.bold.green + '.'
		})
		.option('pure', {
			alias: 'p',
			default: false,
			type: 'boolean',
			describe: 'Create a view ' + 'with `PureComponent`'.bold.green + '.'
		});
	}, (...args) => injectTerraceCliOptions(generateView, ...args))
	.command('component [name]', 'Generate a component'.green, (yargs) => {
		yargs.positional('name', {
			type: 'string',
			describe: 'Creates a component with the given name'
		})
		.option('minimal', {
			alias: 'm',
			default: false,
			type: 'boolean',
			describe: 'Create a component with ' + 'as few things as possible'.bold.green + '.'
		})
		.option('no-intl', {
			alias: 'i',
			default: false,
			type: 'boolean',
			describe: 'Create a component ' + 'without i18n support'.bold.green + '.'
		})
		.option('pure', {
			alias: 'p',
			default: false,
			type: 'boolean',
			describe: 'Create a component ' + 'with `PureComponent`'.bold.green + '.'
		})
		.option('sfc', {
			alias: 's',
			default: false,
			type: 'boolean',
			describe: 'Create a component as a ' + 'stateless function component'.bold.green
				+ '.\nCreates a tiny component with no i18n support.' + '\nOther flags are ignored when the -s flag is passed.'
		});
	}, (...args) => injectTerraceCliOptions(generateComponent, ...args))
	.command('mock [entity] [name]', 'Generate a basic entity mock'.yellow, (yargs) => {
		yargs.positional('entity', {
			type: 'string',
			describe: 'Specify what to mock'
		})
		.positional('name', {
			type: 'string',
			describe: 'Specify name of mocked entity'
		});
	}, (...args) => injectTerraceCliOptions(generateMock, ...args))
	.command('remove [entity] [name_or_subtype] [name]', 'Remove an entity'.red + '\n(such as view or component)', (yargs) => {
		yargs.positional('entity', {
			type: 'string',
			describe: 'Specify the entity type to remove. eg. view, component.'
		});
		yargs.positional('name_or_subtype', {
			type: 'string',
			describe: 'Specify the dasherized name of the entity to remove, or the subtype.'
		});
		yargs.positional('name', {
			type: 'string',
			describe: 'Specify the dasherized name of the entity to remove, ' + 'if the previous argument was the subtype.'.bold
		});
	}, (...args) => injectTerraceCliOptions(removeEntity, ...args))
	.strict()
	.option('ignore-defaults', {
		alias: 'I',
		default: false,
		type: 'boolean',
		describe: 'Ignore any defaults set in the .terrace-cli file for that command.'
	})
	.help().alias('h', 'help')
	.version(getTerraceVersion()).alias('v', 'version')
	.epilogue('For more information, find the documentation at https://github.com/Shuttl-Tech/terrace.js\n'.cyan +
		'ℹ️  To set defaults for commands other than `create`, use the .terrace-cli file.'.yellow)
	.demandCommand(1, 'You need to specify one of the listed commands.'.red.underline)
	.argv;
