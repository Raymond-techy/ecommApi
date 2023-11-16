const { User } = require("../models/user");
const bcrypt = require("bcrypt");

async function registerUserService(body) {
  const { name, email, password } = body;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password: hashed,
  });

  await newUser.save();
  const token = newUser.generateAuthToken();
  return token;
}

module.exports = { registerUserService };
