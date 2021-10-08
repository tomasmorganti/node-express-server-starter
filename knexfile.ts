import 'dotenv/config.js';

module.exports = {
    client: 'pg',
    useNullAsDefault: true,
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
        directory: './src/db/migrations',
    },
    seeds: {
        directory: './src/db/seeds',
    },
};
