const dbConfig = {
    pgHost: process.env.PG_HOST,
    pgDatabase: process.env.PG_DATABASE,
    pgUser: process.env.PG_USER,
    pgPassword: process.env.PG_PASSWORD,
    pgPort: process.env.PG_PORT,
    dialect: "postgres"
};

module.exports = dbConfig;
