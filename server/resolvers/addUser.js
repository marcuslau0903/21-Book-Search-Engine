const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const addUser = async (_, { input }) => {
  // get access to username, email, password from request
  const { username, email, password } = input;

  // find the user from DB by using the email
  const user = await User.findOne({ email });

  // check if the user exists
  if (user) {
    throw new AuthenticationError("User already exists");
  }

  // create the user in the DB
  const newUser = await User.create(input);

  // generate token
  const token = signToken({
    id: newUser._id,
    email: newUser.email,
    username: newUser.username,
  });

  return {
    token,
    user: newUser,
  };
};

module.exports = addUser;