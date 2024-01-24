const { Client } = require("pg");

const client = new Client({
  user: "e1admin",
  host: "localhost",
  port: 5432,
  database: "e1blog",
  password: "H/KMC123",
});

const connectToPostgreSQL = async () => {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
    throw err;
  }
};

const queryPostgreSQL = async (sql) => {
  try {
    const result = await client.query(sql);
    return result.rows;
  } catch (err) {
    console.error('Error querying PostgreSQL:', err);
    throw err;
  }
};

const disconnectFromPostgreSQL = async () => {
  try {
    await client.end();
    console.log('Disconnected from PostgreSQL database');
  } catch (err) {
    console.error('Error disconnecting from PostgreSQL:', err);
    throw err;
  }
};

module.exports = {
  connectToPostgreSQL,
  queryPostgreSQL,
  disconnectFromPostgreSQL,
};


