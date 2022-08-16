import { Core } from './core';
import { CronJob } from 'cron';

export interface UserRecord {
    names: string[],
    offset: number,
}

export class Timezone {
    names: string[];

    time_offset: number;

    cron: CronJob | undefined = undefined;

    hour = 7;

    minute = 30;

    constructor(user_record: UserRecord, core: Core) {
        core.showInfo(`creating timezone object for users ${user_record.names.join(', ')} on offset ${user_record.offset}`);
        this.names = user_record.names;
        this.time_offset = user_record.offset;
        this.cron = new CronJob({
            cronTime: `${this.minute} ${this.hour} * * * *`,
            onTick: () => {
                core.send(`woyo ${user_record.names.join(', ')} :feet_wave:`)
                    .then(() => core.showInfo('wowo sent'));
            },
            utcOffset: this.time_offset,
        });
        this.cron.start();
    }
}
