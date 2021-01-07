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
const io = require('socket.io')(http);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'snsk3779@',
  database: 'mydb',
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

//공지사항
app.post('/Notice', (req, res) => {
  connection.query('SELECT notice_body,notice_date FROM notice', function (
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

io.on('connection', function (socket) {});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});