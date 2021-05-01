/* eslint-disable no-unused-vars */

const Discord = require("discord.js");

const mongo = require("../../mongo");

const courseSchema = require("../../schemas/courseschema");

module.exports = {
  name: "schedule",
  description: "Shows schedule!",
  async execute(message, args) {
    const { guild, member } = message;
    const memberRoles = member.roles.cache.map((role) => {
      return role.id;
    });

    var memberCourses = null;
    await mongo().then(async (mongoose) => {
      try {
        memberCourses = await courseSchema.find({
          role: { $in: memberRoles },
        });
      } finally {
        mongoose.connection.close();
      }
    });

    memberCourses.forEach((memberCourse) => {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#304281")
        .setTitle(memberCourse.name)
        .setURL("https://www.google.com")
        .setDescription("This is your schedule");
      memberCourse.lessons.forEach((lesson) => {
        const date = new Date(lesson.date);
        newEmbed.addField(lesson.title, date.toDateString(), true);
      });
      message.channel.send(newEmbed);
    });
  },
};
