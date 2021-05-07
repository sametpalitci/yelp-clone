require('dotenv').config({});
const express = require('express');
const app = express();
const morgan = require('morgan');
const { graphqlHTTP } = require('express-graphql')

const db = require('./models');
const GraphQLRootSchema = require('./graphql');

app.use(express.json());
app.use(morgan('dev'));

app.use(graphqlHTTP({
    schema: GraphQLRootSchema,
    graphiql: true
}));

db.sequelize.sync().then(() => {
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`App is listening ${process.env.SERVER_PORT} Port`);
    })
})