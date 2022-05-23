import { Client, Intents, TextChannel} from 'discord.js';
import { token, channels } from '../config.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
  sendTo(channels['debug'], 'Wowo les amis :wave:')
  sendTo(channels['debug'], ':D')
});

client.login(token)
.then(token => {
  console.log(`token in use is ${token}`);
});

function sendTo(channelId: string, msg: string) {
  const channel = client.channels.cache.get(channelId);

  if (channel?.isText) {
    (channel as TextChannel).send(msg)
      .then(_ => console.log(`message sent: ${msg}`))
      .catch(err => {
        throw Error(`message failed with error: ${err}`)
      });
  }
}

