import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";

import database from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return database.games;
    },
    game(_, args) {
      return database.games.find((game) => game.id === args.id);
    },
    authors() {
      return database.authors;
    },
    author(_, args) {
      return database.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return database.reviews;
    },
    review(_, args) {
      return database.reviews.find((review) => review.id === args.id);
    },
  },
  Review: {
    game(parent) {
      return database.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return database.authors.find((author) => author.id === parent.author_id);
    },
  },
  Author: {
    reviews(parent) {
      return database.reviews.filter(
        (review) => review.author_id === parent.id
      );
    },
  },
  Game: {
    reviews(parent) {
      return database.reviews.filter((review) => review.game_id === parent.id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: 5001 } });

console.log(`Server ready at URL ${url}`);
