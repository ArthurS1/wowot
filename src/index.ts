import { Client, Intents, TextChannel} from 'discord.js';
import { token } from '../config.json';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Ready!');
  sendHello()
});

client.login(token)
.then(token => {
  console.log(`token in use is ${token}`);
});

function sendHello() {
  const channel = client.channels.cache.get('798678617840287755');

  if (channel?.isText) {
    (channel as TextChannel).send("Bonjour, je suis wowot :wave:")
      .then(_ => console.log('message sent'))
      .catch(err => console.log(`message failed with error: ${err}`));
  }
}

