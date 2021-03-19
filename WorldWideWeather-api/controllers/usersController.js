const bcrypt = require("bcryptjs");
const db = require("../models");

async function create(req, res) {
  const { name, email, password } = req.body;

  // Validate create user form inputs
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ status: 400, message: "All Fields Are Required" });
  }

  // Asyc/Await Version
  try {
    const foundUser = await db.User.findOne({ email });

    if (foundUser) {
      console.log("User account already exists: ", foundUser);
      return res
        .status(400)
        .json({ status: 400, error: "User already exists. Please login" });
    }

    // Create Salt for password hash
    const salt = await bcrypt.genSalt(10);

    // Hash user plain text password
    const hash = await bcrypt.hash(password, salt);

    const newUser = await db.User.create({ name, email, password: hash });

    // Respond back to client
    res.json(newUser);
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again" });
  }
}

async function getProfile(req, res) {
  console.log("request =", req);
  try {
    // currentUserId = req.currentUserId
    // Findy User by ID
    const user = await db.User.findById(req.currentUserId);
    console.log("user =", user);

    return res.json({ status: 200, profile: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, error: "Something went wrong. Please try again" });
  }
}

module.exports = {
  create,
  getProfile,
};
