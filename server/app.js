require('dotenv').config({});
const express = require('express');
const app = express();
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors');

const db = require('./models');
const GraphQLRootSchema = require('./graphql');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/graphql', graphqlHTTP((request, response, graphQlParams) => ({
    schema: GraphQLRootSchema,
    graphiql: process.env.NODE_ENV === 'development',
    context: {
        request,
        test: 'Example context value'
    }
})));

db.sequelize.sync().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`App is listening ${process.env.SERVER_PORT} Port`);
    })
})

module.exports = app;