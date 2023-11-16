const { registerUserService } = require("../Service/auth");
const { validateUser, User } = require("../models/user");
const Joi = require("joi");

const bcrypt = require("bcrypt");

async function loginUser(req, res) {
  const { email, password } = req.body;

  const { error } = validateLogin({ email, password });
  if (error) return res.status(401).send(error.details[0].message);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email/password");

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) return res.status(400).send("Invalid email/password");
  const token = user.generateAuthToken();
  return res.status(200).send(token);
}

async function registerUser(req, res) {
  const body = req.body;
  const { error } = validateUser(body);
  if (error) return res.status(401).send(error.details[0].message);

  const user = await User.findOne({ email: body.email });
  if (user) return res.status(400).send("User already exist in the database");

  const token = await registerUserService(body);
  res
    .header("x-auth-token", token)
    .send({ message: "registration successful" });
}

const validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(user);
};

module.exports = { loginUser, registerUser };
