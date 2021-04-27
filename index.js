/* eslint-disable no-unused-vars */
const fs = require("fs");
const Discord = require("discord.js");

const { token, prefix } = require("./config.json");

const client = new Discord.Client();

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);

    client.commands.set(command.name, command);
  }
}

client.login(token);