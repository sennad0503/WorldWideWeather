require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");

app.use(bodyParser.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("API success");
});

app.use("/weather", routes.weather);
// Users API Routes
app.use("/user", routes.users);
// Auth API Routes
app.use("/auth", routes.auth);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
