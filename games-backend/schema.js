export const typeDefs = `#graphql

    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    input AddGameInput {
        title: String!
        platform: [String!]!
    }

    input UpdateGameInput {
        title: String
    }

    type Mutation {
        addGame(game: AddGameInput!): Game!
        
        updateGame(id: ID!, game: UpdateGameInput!): Game!
        
        deleteGame(id: ID!): [Game!]
    }
    
`;
