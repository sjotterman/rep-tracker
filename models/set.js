const mongoose = require("mongoose");

const SetSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is required."],
  },
  // todo: make this id a ref to exercise._id
  exercise: {
    name: {
      type: String,
      required: [true, "exercise name is required"],
    },
    _id: {
      type: String,
      required: [true, "exerciseId is required"],
    },
  },
  reps: {
    type: Number,
    required: [true, "reps is required"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Set || mongoose.model("Set", SetSchema);
