const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const courseSchema = mongoose.Schema({
  lessons: { required: true, type: Array },
  lessonStart: { required: true, type: Date },
  name: reqString,
  role: reqString,
});

module.exports = mongoose.model("course-schema", courseSchema);
