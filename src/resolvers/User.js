import { ApolloError } from "apollo-server-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const userResolvers = {
  Mutation: {
    async registerUser(_, { input: { username, email, password } }) {
      const availableUser = await User.findOne({ email });
      if (availableUser)
        throw new ApolloError(
          "This user already exists " + email,
          "USER_ALREADY_EXISTS"
        );

      const encryptedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ user_id: newUser._id, email }, "auth_string", {
        expiresIn: "2h",
      });
      newUser.token = token;

      const res = await newUser.save();

      return {
        id: res._id,
        ...res._doc,
      };
    },
    async loginUser(_, { input: { email, password } }) {
      const user = await User.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user._id, email }, "auth_string", {
          expiresIn: "2h",
        });
        user.token = token;
        return {
          id: user.id,
          ...user._doc,
        };
      } else {
        throw new ApolloError("Incorrect password", "INCORRECT PASSWORD");
      }
    },
  },
  Query: {
    user: async (_, { ID }) => await User.findById(ID),
  },
};

export default userResolvers;
