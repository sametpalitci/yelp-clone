const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const UserMutation = require('./mutations/User');
const RestaurantMutation = require('./mutations/Restaurant');
const CommentMutation = require('./mutations/Comment');


const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Root Query",
    fields: {
        getRestaurant: RestaurantMutation.get(),
        getComment: CommentMutation.get(),
    }
})

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Root Mutation",
    fields: {
        login: UserMutation.login(),
        register: UserMutation.register(),
        addRestaurant: RestaurantMutation.add(),
        addComment: CommentMutation.add(),
    }
});

const GraphQLRootSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
})

module.exports = GraphQLRootSchema;