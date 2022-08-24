const  { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            if(context.user){
                const userData = await User.findOne({ _id: context.user._id })
                   
                    return userData;
            }
            throw new AuthenticationError('Not logged in');        
    },

    users: async () => {
        return User.find()
           
    },

    user: async ({ _id }) => {
        return User.findOne({ _id })
            
    },

    books: async () => {
        return Book.find()
    }
},
    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email, password });

            if(!user) {
                throw new AuthenticationError('Try again!');
            }

            const correctPass = await user.isCorrectPassword(password);

            if(!correctPass) {
                throw new AuthenticationError('Try again');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async ( parent, { bookId, author, title, description, image, link }, context ) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id },
                    { $addToSet: { books: bookId, author, title, description, image, link  }},
                    { new: true }
                );

                return updatedUser;
            }
            throw new AuthenticationError('Please log in!');
        }, 

        removeBook: async( parent, { bookId }, context) => {
            if(context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id },
                    { $removeFromSet: { books: bookId}},
                    { new: true }
                )

                return updatedUser;
            }
            throw new AuthenticationError('Please log in!');
        }
    }
};

module.exports = resolvers;