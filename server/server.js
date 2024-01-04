const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000
const { connectToPostgreSQL, queryPostgreSQL, disconnectFromPostgreSQL } = require('./psql.js');

app.use(cors());
const bodyParser =require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

// PostgreSQL 연결
connectToPostgreSQL()
  .then(() => {
    // 서버 시작
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });


// API 라우팅
app.get('/api/db', async (req, res) => {
  try {
    const sql = 'SELECT * FROM test';
    const rows = await queryPostgreSQL(sql);
    res.send(rows);
  } catch (err) {
    console.error('Error querying PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/delete', async (req, res) => {
  try {
    const sql = 'DELETE FROM test';
    await queryPostgreSQL(sql);
    res.send('모든 데이터가 삭제되었습니다.');
  } catch (err) {
    console.error('Error deleting from PostgreSQL:', err);
    res.status(500).send('삭제가 실패했습니다.');
  }
});

app.post('/api/insert', async (req, res) => {
  try {
    const sql = `INSERT INTO test (name) VALUES ('${req.body.post}')`;
    await queryPostgreSQL(sql);
    res.send('삽입이 완료되었습니다.');
  } catch (err) {
    console.error('Error inserting into PostgreSQL:', err);
    res.status(500).send('삽입이 실패했습니다.');
  }
});

// 서버 종료 시 PostgreSQL 연결 종료
process.on('exit', () => {
  disconnectFromPostgreSQL()
    .then(() => {
      console.log('Disconnected from PostgreSQL database');
    })
    .catch((err) => {
      console.error('Error disconnecting from PostgreSQL:', err);
    });
});
