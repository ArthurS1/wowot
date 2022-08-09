import { Core, ServerState } from './core';
import * as config from '../config.json';
import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(1))
    .help()
    .usage('Usage: $0 [--help] [--prod] FILE')
    .options({
        prod: {
            type: 'boolean',
            alias: 'p',
            default: false,
            desc: 'turns production mod on sending wowos on the production channel',
        },
        file: {
            type: 'string',
            alias: 'f',
            demandOption: 'must have timezones csv',
            desc: 'a csv file with columns name; timezone; comment',
        }
    })
    .describe('prod', 'prod')
    .parseSync();

if (argv.prod)
    new Core(config, ServerState.Production, argv.file);
else
    new Core(config, ServerState.Debug, argv.file);
