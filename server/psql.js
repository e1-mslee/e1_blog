const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1234",
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


