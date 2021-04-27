/* eslint-disable no-unused-vars */
module.exports = {
  name: "ping",
  cooldown: 1,
  description: "Ping!",
  execute(message, args) {
    message.channel.send("Pong.");
    console.log("Command pong ran!");
  },
};
