/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");

module.exports = {
  name: "stats",
  description: "Stats!",
  guildOnly: true,
  execute(message, args) {
    function* range(end) {
      for (let i = 0; i < end; i++) yield i;
    }

    message.channel.send(`Name: ${message.guild.name}`);
    console.log("Stats ran");
    console.log(message.guild.roles);
    var role_message = "";
    roles = message.guild.roles;
    role_ids = roles.cache.map((role) => {
      return role.id;
    });
    console.log(role_ids);
    message.guild.roles.cache.forEach(
      (role) =>
        (role_message =
          role_message + `Role: ${role.name} Role id: ${role.id}\n`)
    );
    message.channel.send(role_message);
  },
};
