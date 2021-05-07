const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } = require('graphql');

const CommentType = new GraphQLObjectType({
    name: "Comment",
    description: "Comment Management",
    fields: {
        comment: {
            type: GraphQLString
        },
        skor: {
            type: GraphQLInt
        }
    }
});

module.exports = CommentType;