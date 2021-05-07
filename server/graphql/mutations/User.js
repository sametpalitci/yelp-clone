const { GraphQLString, GraphQLID } = require('graphql');
const UserType = require('../types/User');
const UserResolver = require('../resolvers/User');

const login = () => {
    return {
        type: UserType,
        args: {
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            },
        },
        resolve: (parent, args) => {
            return UserResolver.login(args);
        }
    }
}
const register = () => {
    return {
        type: UserType,
        args: {
            username: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString
            }
        },
        resolve: (parent, args) => {
            return UserResolver.register(args);
        }
    }
}
module.exports = { login, register }