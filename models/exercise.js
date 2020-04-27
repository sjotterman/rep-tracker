const mongoose = require("mongoose");

const ExerciseScema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  description: {
    type: String,
    unique: false,
    trim: true,
    maxlength: [300, "Description cannot be more than 300 characters"],
  },
});

module.exports =
  mongoose.models.Exercise || mongoose.model("Exercise", ExerciseScema);
