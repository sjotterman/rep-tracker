const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is required"],
  },
  // todo: make this id a ref to exercise._id
  exerciseId: {
    type: String,
    required: [true, "userId is required"],
  },
  exercise: {
    type: String,
    unique: false,
  },
  reps: {
    type: Number,
    required: [true, "reps is required"],
  },
});

module.exports = mongoose.models.Set || mongoose.model("Set", SetSchema);
