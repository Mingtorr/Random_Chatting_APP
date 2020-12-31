const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
//salt 암호화 모듈
const crypto = require('crypto');
// nodemailer 모듈 요청
var http = require('http').createServer(app);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb',
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

//공지사항
app.post('/Notice', (req, res) => {
  connection.query('SELECT notice_body FROM notice', function (
    err,
    rows,
    fields,
  ) {
    if (err) {
      res.send(false);
    } else {
      res.send(rows);
    }
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
