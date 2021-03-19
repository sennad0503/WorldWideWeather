const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    temp: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
