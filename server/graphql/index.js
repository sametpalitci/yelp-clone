const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const UserMutation = require('./mutations/User');

const rootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    description: "Root Query",
    fields: {
        hello: {
            type: GraphQLString,
            resolve: (parent, args) => {
                return "world";
            }
        }
    }
})

const rootMutation = new GraphQLObjectType({
    name: "RootMutation",
    description: "Root Mutation",
    fields: {
        login: UserMutation.login(),
        register: UserMutation.register(),
    }
});

const GraphQLRootSchema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
})

module.exports = GraphQLRootSchema;