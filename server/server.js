const express = require("express");
const graphqlHttp = require("express-graphql");
const cors = require("cors");
const schema = require("./graphql/schema.js");
const db = require("./models/index.js");

const port = process.env.PORT || "5000";
const app = express();

// middlewares

// allow cross-origin resource sharing
app.use(cors());

// connect express to graphql
app.use(
    "/graphql",
    graphqlHttp({
        schema: schema,
        graphiql: true
    })
);

// connect to the database
db.sync()
    .then(() => console.log("Database Connected"))
    .catch(e => console.log(e));

// Start up the app
app.listen(port, () => console.log(`==> Server is running on port ${port}`));
