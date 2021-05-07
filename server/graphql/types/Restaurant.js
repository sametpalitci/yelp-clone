const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

const RestaurantType = new GraphQLObjectType({
    name: "Restaurant",
    description: "Restaurant Management",
    fields: {
        name: {
            type: GraphQLString
        },
        location: {
            type: GraphQLString
        },
        price: {
            type: GraphQLInt
        },
        userId: {
            type: GraphQLID
        },
        id: {
            type: GraphQLID
        }
    }
});

module.exports = RestaurantType;