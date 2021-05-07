const RestaurantType = require("../types/Restaurant");
const RestaurantResolver = require('../resolvers/Restaurant');
const { GraphQLString, GraphQLInt, GraphQLID, GraphQLList } = require("graphql");
const { verifyJWT } = require('../../utils/jwt');
const add = () => {
    return {
        type: RestaurantType,
        args: {
            name: {
                type: GraphQLString
            },
            location: {
                type: GraphQLString
            },
            price: {
                type: GraphQLInt
            }
        },
        resolve: (parent, args, context) => {
            return verifyJWT(context, () => {
                return RestaurantResolver.add(args, context);
            });
        }
    };
};
const get = () => {
    return {
        type: new GraphQLList(RestaurantType),
        resolve: (parent, args, context) => {
            return RestaurantResolver.get(args, context);
        }
    };
}
module.exports = { add, get };