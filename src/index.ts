import { Core, ServerState} from './core';
import * as config from '../config.json';

switch (process.argv[2]) {
case '--prod':
    new Core(config, ServerState.Production);
    break;
case '--help':
    Core.showUsage();
    break;
default:
    new Core(config, ServerState.Debug);
    break;
}
