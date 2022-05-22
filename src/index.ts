import { Client, Intents, TextChannel, Message} from 'discord.js';
import { token, channels } from '../config.json';
import { LocalTime } from '@js-joda/core';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Working : ' + LocalTime.now());
  sendTo(channels['debug'], 'Wowo les amis :wave:')
    .then(response => {
      console.log(response);
	    console.log('Ending : ' + LocalTime.now());
      process.exit()
    })
    .catch(err => {
      console.log(err)
	    console.log('Ending with error : ' + LocalTime.now());
      process.exit(1)
    });
});

client.login(token)
.then(token => {
  console.log(`token in use is ${token}`);
});

async function sendTo(channelId: string, msg: string): Promise<Message> {
  const channel = client.channels.cache.get(channelId);

  debugger
  if (channel?.isText) {
    return (channel as TextChannel).send(msg)
  }
  return Promise.reject("not a text channel")
}

