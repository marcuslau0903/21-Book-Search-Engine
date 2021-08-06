const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");
const { signToken } = require("../utils/auth");

const login = async (_, { input }) => {
  // get access to email and password from request
  const { email, password } = input;

  // find the user from DB by using the email
  const user = await User.findOne({ email });

  // check if the user exists
  if (!user) {
    throw new AuthenticationError("User does not exist");
  }

  // check if password for the user is correct
  const isCorrectPassword = user.isCorrectPassword(password);

  // if user exists and password is correct
  if (isCorrectPassword) {
    // generate token
    const token = signToken({
      id: user._id,
      email: user.email,
      username: user.username,
    });

    return {
      token,
      user,
    };
  }
  // if password is incorrect
  else {
    throw new AuthenticationError("Incorrect password");
  }
};

module.exports = login;