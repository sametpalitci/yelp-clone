const CommentResolver = require('../resolvers/Comment');
const CommentType = require('../types/Comment');

const { verifyJWT } = require('../../utils/jwt');
const { GraphQLString, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');

const add = () => {
    return {
        type: CommentType,
        args: {
            comment: {
                type: GraphQLString
            },
            skor: {
                type: GraphQLInt
            },
            restaurantId: {
                type: GraphQLID
            }
        },
        resolve: (parent, args, context) => {
            return verifyJWT(context, () => {
                return CommentResolver.add(args, context);
            });
        }
    }
};

const get = () => {
    return {
        type: new GraphQLList(CommentType),
        args: {
            restaurantId: {
                type: GraphQLID
            }
        },
        resolve: (parent, args) => {
            return CommentResolver.get(args);
        }
    }
}

module.exports = { add, get }