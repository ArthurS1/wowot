import {
    Client,
    Intents,
    TextChannel,
    Message,
} from 'discord.js';
import { LocalTime } from '@js-joda/core';
import { CronJob } from 'cron';
import Conf from './conf';

export enum ServerState {
    Production,
    Debug,
}

export class Core {
    conf: Conf;

    server_state: ServerState;

    client: Client;

    cron: CronJob | undefined = undefined;

    constructor(conf: Conf, prod: ServerState) {
        this.showInfo('starting bot');
        this.conf = conf;
        this.server_state = prod;
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.client.once('ready', () => {
            this.cron = new CronJob(this.conf.cron, () => {
                this.send('ωoωo les amis :wave:')
                    .then(() => this.showInfo('wowo sent'));
            });
            this.cron.start();
        });
        this.setup();
    }

    async setup() {
        await this.client.login(this.conf.token);
        this.showInfo('bot logged');
    }

    async send(message: string): Promise<Message> {
        const channel_id = this.server_state === ServerState.Production ?
            this.conf.production_channel : this.conf.debug_channel;
        const channel = this.client.channels.cache.get(channel_id);

        if (channel?.isText) {
            return (channel as TextChannel).send(message);
        }
        return Promise.reject(new Error('not a text channel'));
    }

    showInfo(info: string) {
        const time = LocalTime.now();
        const state = this.server_state === ServerState.Production ? 'Production' : 'Debug';

        console.info(`[${time}, ${state}] ${info}`);
    }

    static showUsage() {
        console.info(`USAGE:
    wowot [--help] [--prod]

DESCRIPTION:
    help    shows this help message
    prod    turns production mod on sending wowos on the production channel`);
    }
}
