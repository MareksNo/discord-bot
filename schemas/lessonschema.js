const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const lessonSchema = mongoose.Schema({
  title: reqString,
  date: { type: Date, required: true },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("lesson-schema", lessonSchema);
