const express = require("express");
const graphqlHttp = require("express-graphql");
const depthLimit = require("graphql-depth-limit");
const cors = require("cors");
const schema = require("./graphql/schema.js");
const db = require("./models/index.js");

const port = process.env.PORT || "5000";

const validations = [depthLimit(10)];

const graphiql = process.env.NODE_ENV == "development" ? true : false;

const app = express();

// middlewares

// allow cross-origin resource sharing
app.use(cors());

// connect express to graphql
app.use(
    "/api",
    graphqlHttp({
        schema: schema,
        graphiql: graphiql,
        validationRules: validations
    })
);

// connect to the database
db.sync()
    .then(() => console.log("Database Connected"))
    .catch(e => console.log(e));

// Start up the app
app.listen(port, () => console.log(`==> Server is running on port ${port}`));
