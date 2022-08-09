import { Core } from './core';
import { CronJob } from 'cron';

export class Timezone {
    names: string[];

    time_offset: number;

    cron: CronJob | undefined = undefined;

    hour = 7;

    minute = 30;

    constructor(names: string[], offset: number, core: Core) {
        this.names = names;
        this.time_offset = offset;
        this.cron = new CronJob({
            cronTime: `${this.minute} ${this.hour} * * * *`,
            onTick: () => {
                core.send(`wowo ${names.join(', ')} :feet_wave:`)
                    .then(() => core.showInfo('wowo sent'));
            },
            utcOffset: this.time_offset,
        });
        this.cron.start();
    }
}
