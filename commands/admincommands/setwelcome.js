/* eslint-disable no-unused-vars */

const welcomeSchema = require("../../schemas/welcomeschema");
const mongo = require("../../mongo");
const { guildOnly } = require("./stats");

module.exports = {
  name: "setwelcome",
  description: "Information about the arguments provided.",
  args: true,
  async execute(message, args) {
    const { member, channel, content, guild } = message;

    if (!member.hasPermission("ADMINISTRATOR")) {
      channel.send("Missing permissions");
      return;
    }

    let text = content;

    const split = text.split(" ");

    split.shift();
    text = split.join(" ");

    await mongo().then(async (mongoose) => {
      try {
        await welcomeSchema.findOneAndUpdate(
          {
            _id: guild.id,
          },
          {
            _id: guild.id,
            channelId: channel.id,
            text: text,
          },
          {
            upsert: true,
          }
        );
        channel.send(`Welcome message updated to ${text}`);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
