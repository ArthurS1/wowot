"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const config_json_1 = require("../config.json");
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once('ready', () => {
    console.log('Ready!');
    sendHello();
});
client.login(config_json_1.token)
    .then(token => {
    console.log(`token in use is ${token}`);
});
function sendHello() {
    const channel = client.channels.cache.get('798678617840287755');
    if (channel === null || channel === void 0 ? void 0 : channel.isText) {
        channel.send("Bonjour, je suis wowot :wave:")
            .then(_ => console.log('message sent'))
            .catch(err => console.log(`message failed with error: ${err}`));
    }
}
