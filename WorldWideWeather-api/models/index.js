const mongoose = require("mongoose");
const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/worldwideweather";
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, options)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err));

module.exports = {
  Weather: require("./Weather"),
  User: require("./User"),
};
