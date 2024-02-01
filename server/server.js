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

app.get('/api/post/:category/:postid', async (req, res) => {
  try {
    const category = req.params.category;
    const postid = req.params.postid;

    let sql = `SELECT POST_ID
                      ,SUBJECT
                      ,CG.CA_NM
                      ,TO_CHAR(CREATE_DATE, 'YYYY-MM-DD') AS CREATE_DATE
                      ,UPDATE_DATE 
                      ,CONTENT
                      ,CASE WHEN SUPI_ID > 1 THEN
                      (SELECT CA_NM || ' > ' FROM CATEGORY WHERE CA_ID=CG.SUPI_ID) || CG.CA_NM
                      ELSE
                      CG.CA_NM
                      END
                FROM POST P,
                      CATEGORY CG
                WHERE P.CATEGORY_ID=CG.CA_ID 
                  AND CA_NM='${category}'`;
    if(postid!=0){
            sql+=`AND POST_ID='${postid}'`; 
    }
      sql+=`ORDER BY CREATE_DATE
                LIMIT 1;`;
    const rows = await queryPostgreSQL(sql);
    res.send(rows[0]);
  } catch (err) {
    console.error('Error querying PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/getModPost/:category/:postid', async(req, res) => {
  try{

    const category = req.params.category;
    const postid = req.params.postid;
    let sql = ` SELECT POST_ID
                         ,SUBJECT
                         ,CG.CA_NM
                         ,CONTENT
                         ,(SELECT CA_NM  FROM CATEGORY WHERE CA_ID=CG.SUPI_ID) supi_id
                    FROM POST P,
                         CATEGORY CG
              WHERE P.CATEGORY_ID=CG.CA_ID 
                AND CA_NM='${category}'`;
      if(`${postid}`!=0){
        sql +=`AND POST_ID='${postid}'`; 
      }else{
        sql +=`ORDER BY CREATE_DATE
				       LIMIT 1;` 
      }
        const rows = await queryPostgreSQL(sql);
    res.send(rows[0]);
  } catch (err) { 
    console.error('Error querying PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
  }
})

app.get('/api/getPosts', async(req, res) => {
  try{
    const sql = ` SELECT post_id,
                         subject,
                         CONTENT,
                         category_id,
                         TO_CHAR(create_date, 'YYYY-MM-DD') AS date 
                    FROM post
                   WHERE category_id = (
                                        SELECT ca_id
                                          FROM category c
                                         WHERE ca_nm = '${req.query.category}')
                ORDER BY post_id`;
    const rows = await queryPostgreSQL(sql);
    res.send(rows);
  } catch (err) { 
    console.error('Error querying PostgreSQL:', err);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/api/category/get', async(req, res) => {
  try{
    const sql =  `SELECT ca_id, ca_nm
                    FROM category
                    WHERE supi_id = ${req.body.supi_id}`
    let rows = await queryPostgreSQL(sql);
    res.send(rows);
  }catch(err){
    console.error('카테고리 목록 조회에 실패했습니다.');
    res.status(500).send('카테고리 조회에 실패했습니다.');
  }
})

app.post('/api/post/insert', async(req,res) => {
  try{
    const sql = `INSERT INTO post ( post_id
                                  , subject
                                  , content
                                  , category_id
                                  , create_date
                                  , update_date )
                            SELECT  COALESCE(MAX(post_id)+1,1)
                                  , '${req.body.subject}'
                                  , '${req.body.content}'
                                  , '${req.body.category_id}'
                                  , now()
                                  , now()
                              FROM post `;

    console.log(sql);
    await queryPostgreSQL(sql);
    res.status(200).send('SUCCESS');
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('저장에 실패했습니다.' + err);
  }
})

app.post('/api/post/mod', async(req,res) => {
  try{
    let sql = `UPDATE post 
                    SET subject='${req.body.subject}'
                        ,content='${req.body.content}'
                        ,category_id=${req.body.category_id}
                        ,update_date= now()
                  WHERE 1=1 `;
                  if(`${req.query.postid}`!=0){
                    sql +=`AND POST_ID=${req.query.postid}`; 
                  }else{
                    sql +=`AND POST_ID IN((SELECT POST_ID FROM POST WHERE CATEGORY_ID=${req.body.category_id} ORDER BY CREATE_DATE LIMIT 1));` 
                  } 
    console.log(sql);
    await queryPostgreSQL(sql);
    res.status(200).send('SUCCESS');
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('저장에 실패했습니다.' + err);
  }
})

app.post('/api/post/deleteC1', async (req, res) => {
  try {
    const sql = `DELETE FROM post
                   WHERE post_id = (
                    
                                    SELECT post_id
                                      FROM category c
                                      JOIN post p
                                        ON p.category_id = c.ca_id
                                     WHERE c.ca_nm = '${req.body.categoryNm}'
                                  ORDER BY create_date
                                     LIMIT 1  
                   )`;
    await queryPostgreSQL(sql);                
    res.status(200).send('SUCCESS');
  } catch (err) {
    console.error('에러가 발생했습니다.: ', err);
    res.status(500).send('삭제 실패');
  }
});

app.post('/api/post/deleteC2', async (req, res) => {
  try {
    const sql = `DELETE FROM post
                   WHERE post_id = '${req.body.postId}'`;
    await queryPostgreSQL(sql);                
    res.status(200).send('SUCCESS');
  } catch (err) {
    console.error('에러가 발생했습니다.: ', err);
    res.status(500).send('삭제 실패');
  }
});

app.post('/api/post/getPostId', async (req, res) => {
  try {
    const sql = `SELECT post_id
                   FROM post
                  WHERE category_id = '${req.body.category_id}'
               ORDER BY create_date DESC 
                  LIMIT 1`;
    const rows = await queryPostgreSQL(sql);                
    res.send(rows);
  } catch (err) {
    console.error('에러가 발생했습니다.: ', err);
    res.status(500).send('삭제 실패');
  }
});

app.post('/api/post/getCategoryNm', async (req, res) => {
  try {
    const sql = `SELECT ca_nm
                   FROM category
                  WHERE ca_id = '${req.body.category_id}'`;
    const rows = await queryPostgreSQL(sql);                
    res.send(rows);
  } catch (err) {
    console.error('에러가 발생했습니다.: ', err);
    res.status(500).send('삭제 실패');
  }
});

app.post('/api/categoryList', async (req, res) => {
  try {
    const sql = `SELECT ca_id, 
                        ca_nm, 
                        supi_id 
                   FROM category`;
    const rows = await queryPostgreSQL(sql);     
    res.send(rows);       
  } catch (err) {
    console.error('에러가 발생했습니다.: ',err);
    res.status(500).send('에러 발생');
  }
});

app.post('/api/categoryListPostId', async (req, res) => {
  try {
    const sql = `SELECT post_id
                   FROM post p,category cg
                   WHERE p.category_id=cg.ca_id and ca_nm='${req.query.category}'
                   ORDER BY CREATE_DATE
                   LIMIT 1;`;
    const rows = await queryPostgreSQL(sql);     
    res.send(rows[0]);       
  } catch (err) {
    console.error('에러가 발생했습니다.: ',err);
    res.status(500).send('에러 발생');
  }
});


app.post('/api/supiCategoryList', async (req, res) => {
  try {
    const sql = `SELECT ca_id, 
                        ca_nm, 
                        supi_id 
                   FROM category 
                  WHERE ca_id = 1 OR supi_id = 1`;
    const rows = await queryPostgreSQL(sql);     
    res.send(rows);       
  } catch (err) {
    console.error('에러가 발생했습니다.: ',err);
    res.status(500).send('에러 발생');
  }
});

app.post('/api/categoryDetailList', async (req, res) => {
  try {
    const sql = `SELECT a.ca_id
                      , a.ca_nm
                      , a.supi_id
                      , b.ca_nm supi_nm
                      FROM category a
                      LEFT JOIN category b
                        ON a.supi_id = b.ca_id
                      ORDER BY a.ca_id`;
    const rows = await queryPostgreSQL(sql);     
    res.send(rows);       
  } catch (err) {
    console.error('에러가 발생했습니다.: ',err);
    res.status(500).send('에러 발생');
  }
});

app.post('/api/categoryInsert', async(req,res) => {
  try{
    const sql = `INSERT INTO category ( ca_nm, supi_id )
                        VALUES ( '${req.body.ca_nm}', ${req.body.supi_id})`;

    console.log(sql);
    await queryPostgreSQL(sql);
    res.status(200).send('SUCCESS');
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('저장에 실패했습니다.' + err);
  }
})

app.post('/api/categoryUpdate', async(req,res) => {
  try{
    const sql = `UPDATE category SET ca_nm = '${req.body.ca_nm}', supi_id = ${req.body.supi_id}
                  WHERE ca_id = ${req.body.ca_id}`;

    console.log(sql);
    await queryPostgreSQL(sql);
    res.status(200).send('SUCCESS');
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('저장에 실패했습니다.' + err);
  }
})

app.post('/api/categoryDelete', async(req,res) => {
  try{
    const sql = `DELETE FROM category
                  WHERE ca_id = ${req.body.ca_id}`;

    console.log(sql);
    await queryPostgreSQL(sql);
    res.status(200).send('SUCCESS');
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('저장에 실패했습니다.' + err);
  }
})

app.post('/api/nodeCnt', async(req,res) => {
  try{
    const sql = `SELECT count(*) cnt FROM category
                  WHERE supi_id = ${req.body.ca_id}`;
    console.log(sql);
    const rows = await queryPostgreSQL(sql);     
    res.send(rows);
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('조회에 실패했습니다.' + err);
  }
})

app.post('/api/postCnt', async(req,res) => {
  try{
    const sql = `SELECT count(*) cnt FROM post
                  WHERE category_id = ${req.body.ca_id}`;
    console.log(sql);
    const rows = await queryPostgreSQL(sql);     
    res.send(rows);
  } catch(err){
    console.error('Error inserting post data', err);
    res.status(500).send('조회에 실패했습니다.' + err);
  }
})

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
