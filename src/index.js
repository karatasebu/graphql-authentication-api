import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import "dotenv/config";

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    return server.listen({ port: process.env.PORT });
  })
  .then((res) => {
    console.log(`Server runnig at ${res.url}`);
  });
