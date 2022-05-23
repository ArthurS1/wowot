"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var config_json_1 = require("../config.json");
var client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS] });
client.once('ready', function () {
    console.log('Ready!');
});
client.login(config_json_1.token);
