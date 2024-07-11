const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'graphql_test',
  password: 'root',
  port: 5432,
  idleTimeoutMillis: 300
});

module.exports = pool;