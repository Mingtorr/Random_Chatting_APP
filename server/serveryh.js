const express = require('express');
const app = express();
const port = 3009;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
//salt 암호화 모듈
const crypto = require('crypto');
const {connect} = require('http2');
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
app.post('/Getnotice', (req, res) => {
  // console.log(req.body);
  // console.log('sex');
  connection.query('SELECT * FROM notice', [], function (err, rows, fields) {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      // console.log(rows);
      res.send(rows);
    }
  });
});
app.post('/changeNickname', (req, res) => {
  // console.log(req.body);
  // console.log('sex');
  console.log(req.body);
  connection.query('UPDATE user_table SET user_nickname = (?) WHERE user_key= (?)',[req.body.nickname,req.body.userkey],function(err,rows,field){
    if(err){
      console.log(err);
    }else{
      connection.query('select * from user_table where user_key = ?',[req.body.userkey],function(err,rows,field){
        if(rows[0]===undefined){
          console.log('닉네임변경실패');
        }else{
          res.send(rows[0])
        }
      })
    }
  })
});
app.post('/changPW', (req, res) => {
  // console.log(req.body);
  // console.log('sex');
  let inputPassword = req.body.passwd;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');
  console.log(req.body);
  connection.query('UPDATE user_table SET user_salt = (?),user_passwd = (?) WHERE user_key= (?)',[salt,hashPassword,req.body.user_key],function(err,rows,field){
    if(err){
      console.log(err);
    }else{
      res.send(true)
    }
  })
});
//token변경
app.post('/changeToken', (req, res) => {
  const key = req.body.key;
  const token = req.body.token;
  connection.query(
    'UPDATE user_table SET user_token = (?) WHERE user_key= (?)',
    [token, key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        // console.log('change token complete');
      }
    },
  );
});

io.on('connection', function (socket) {});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});