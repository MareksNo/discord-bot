/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");
const mongoose = require("mongoose");
const courseSchema = require("../../schemas/courseschema");

module.exports = {
  name: "createcourse",
  description: "Create a course!",
  guildOnly: true,
  args: true,
  async execute(message, args) {
    if (args.length < 4) {
      message.channel.send("Please provide at least 4 arguments");
      return;
    }

    const { member, channel, content, guild } = message;
    const courseName = args[0];
    const lessonStart = new Date(args[1]);
    const roleId = args[2];
    const lessonCount = args[3];
    var lessons = Array();

    role_ids = guild.roles.cache.map((role) => {
      return role.id;
    });
    if (!role_ids.includes(roleId)) {
      return channel.send(`${roleId} is not a valid role id!`);
    }

    if (lessonStart == "Invalid Date") {
      return channel.send(`${lessonStart} is not a valid date!`);
    }

    function* range(end) {
      for (let i = 0; i < end; i++) yield i;
    }

    var current_lesson_date = lessonStart;

    for (let x of range(lessonCount)) {
      if (x >= 1) {
        current_lesson_date = new Date(
          current_lesson_date.getFullYear(),
          current_lesson_date.getMonth(),
          current_lesson_date.getDate() + 7
        );
      }
      let lesson = {
        date: current_lesson_date,
        title: `Lesson ${x + 1}`,
      };
      lessons.push(lesson);
    }

    await mongo().then(async (mongoose) => {
      try {
        await new courseSchema({
          name: courseName,
          role: roleId,
          lessons: lessons,
          lessonStart: lessonStart,
        }).save();
        channel.send(`Course ${courseName} created`);
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
