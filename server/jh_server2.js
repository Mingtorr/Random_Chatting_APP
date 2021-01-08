const express = require('express');
const app = express();
const port = 3002;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
// nodemailer 모듈 요청

var http = require('http').createServer(app);
const io = require('socket.io')(http);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2ajrrhtlvj',
  database: 'mydb',
});

connection.connect();

//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

app.post('/Allchatroom_message', (req, res) => {
  connection.query(
    'SELECT A.allmessage_key, A.allmessage_body, A.allmessage_time, A.user_key, user_table.user_nickname FROM (SELECT * FROM allmessage_table ORDER BY allmessage_key DESC limit 30) A LEFT JOIN user_table ON A.user_key = user_table.user_key ORDER BY allmessage_key ASC',
    function (err, rows, field) {
      if (err) {
        console.log(err);
        console.log('allchatromm message err');
      } else if (rows[0] !== undefined) {
        res.send(rows);
      } else {
        console.log('data x');
      }
    },
  );
});

app.post('/My_all_message_save', (req, res) => {
  const all_message_data = req.body;
  connection.query(
    'INSERT INTO allmessage_table (allmessage_body, user_key) values (?,?)',
    [all_message_data.my_all_message, all_message_data.user_key],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        // console.log('전체방_내가 보낸 메세지 저장');
        connection.query(
          'SELECT allmessage_time FROM allmessage_table WHERE user_key = (?) and allmessage_body = (?) ORDER BY allmessage_time DESC',
          [all_message_data.user_key, all_message_data.my_all_message],
          function (err, rows, field) {
            if (rows[0] === undefined) {
              console.log(err);
            } else {
              res.send(rows[0]);
            }
          },
        );
      }
    },
  );
});

io.on('connection', function (socket) {
  socket.on('send_allchatroom', (data) => {
    console.log('내가 전체 메세지 보냄');
    const index = 1;
    const all_send_message = {
      key: index,
      message_body: data.message_body,
      user_nickname: data.user_nickname,
      user_key: data.user_key,
      allmessage_time: data.allmessage_time,
    };
    io.emit('recieve_allchatroom_message', all_send_message);
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
