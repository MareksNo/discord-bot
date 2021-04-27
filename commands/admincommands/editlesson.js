/* eslint-disable no-unused-vars */
const mongo = require("../../mongo");
const mongoose = require("mongoose");
const courseSchema = require("../../schemas/courseschema");

module.exports = {
  name: "editlesson",
  description: "Edit Lesson!",
  guildOnly: true,
  args: true,
  async execute(message, args) {
    if (args.length < 4) {
      message.channel.send("Please provide at least 4 arguments");
      return;
    }
    const role = args[0];
    const lesson_index = args[1];
    const row = args[2];
    var change = args[3];

    if (row === "date") {
      if (!Date.parse(change)) {
        console.log(Date.parse(change));
        message.channel.send(`${change} is not a valid date!`);
        return;
      } else {
        change = new Date(change);
      }
    }

    await mongo().then(async (mongoose) => {
      try {
        const course = await courseSchema.findOne({ role: role });
        const lesson_list = course.lessons;
        lesson_list[lesson_index - 1][row] = change;

        console.log(course);

        await courseSchema.findOneAndUpdate(
          { role: role },
          { lessons: course.lessons },
          { upsert: true }
        );

        message.channel.send(course.lessons[lesson_index - 1][row].toString());
      } finally {
        mongoose.connection.close();
      }
    });
  },
};
