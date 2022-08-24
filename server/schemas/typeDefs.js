const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String
        image: String
        link: String
        title: String
    }

    input savedBook {
        bookId: String
        authors: [String]
        title: String
    }

    type Auth {
        token: ID
        user: User
        }


    type Query {
        me: User
        users: [User]
        user(email: String): User
        books(title: String): [Book]
        book(bookId: String): Book 
    }

    type Mutation {
        login(email: String, password: String): Auth
        addUser(username: String, email: String, password: String): Auth
        saveBook(authors: [String], description: String, title: String, image: String, link: String, bookCount: Int): User
        removeBook(bookId: ID!): User
    }

`;

module.exports = typeDefs;
