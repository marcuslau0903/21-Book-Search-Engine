const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models");

const getSingleUser = async (_, args, context) => {
  // check if the user is in context
  if (context.user) {
    // get the user id from the user object
    const { id } = context.user;

    // find a user by ID and push the book to save to saveBooks array
    const user = await User.findById(id).populate("savedBooks");

    return user;
  }
  // if user is not in the context throw error
  else {
    throw new AuthenticationError(
      "You are not authorised to perform this operation"
    );
  }
};

module.exports = getSingleUser;