import {
    Client,
    Intents,
    TextChannel,
    Message,
} from 'discord.js';
import { LocalTime } from '@js-joda/core';
import { CronJob } from 'cron';
import { Timezone, UserRecord } from './timezone';
import * as Fs from 'fs';
import * as Csv from 'csv';
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

    constructor(conf: Conf, state: ServerState, file: string) {
        this.showInfo('starting bot');
        this.conf = conf;
        this.server_state = state;
        this.client = new Client({ intents: [Intents.FLAGS.GUILDS] });
        this.client.once('ready', () => {
            const timezones_data = this.parseCsv(file);

            if (!timezones_data) {
                this.showInfo('fatal cannot use csv, pulling out.');
            }
            // create timezones
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

    static accumulateRecords(acc: UserRecord[], current: {name: string, offset: string}) : UserRecord[]
    {
        const new_record: UserRecord = {
            names: [current.name],
            offset: Number(current.offset)
        };
        const same_offset = acc.find(
            (value) => value.offset === new_record.offset
        );

        if (same_offset) {
            same_offset.names = same_offset.names.concat(new_record.names);
            return acc;
        } else {
            acc.push(new_record);
            return acc;
        }
    }

    parseCsv(file: string): UserRecord[] {
        let result: UserRecord[] = [];

        Fs.readFile(file, 'utf8', (_, data) => {
            Csv.parse(
                data,
                { columns: true },
                (_, records: { name: string, offset: string }[]) => {
                    result = records.reduce(Core.accumulateRecords, []);
                });
        });
        return result;
    }

    destroy() {
        this.client.destroy();
    }

    showInfo(info: string) {
        const time = LocalTime.now();
        const state = this.server_state === ServerState.Production ? 'Production' : 'Debug';

        console.info(`[${time}, ${state}] ${info}`);
    }
}
