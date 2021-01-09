const express = require('express');
const app = express();
const port = 3005;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
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
// 아이디 중복체크
app.post('/save_message', (req, res) => {
  console.log(req.body);

  connection.query(
    'insert into message_table (room_id,user_key,message_body) values (?,?,?)',
    [req.body.roomid, req.body.userkey, req.body.message],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log('성공');
        res.send(true);
      }
    },
  );
});
app.post('/updateshownickname', (req, res) => {
  console.log(req.body);
  connection.query(
    'update participant set shownickname = 1 where room_id = ? and user_key = ?',
    [req.body.roomid, req.body.userkey],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log('성공');
        res.send(true);
      }
    },
  );
});
app.post('/showmessage', (req, res) => {
  console.log(req.body);
  connection.query(
    'select * from (SELECT user_table.user_key,user_table.user_nickname,message_table.message_body,message_table.message_key,message_table.message_time FROM user_table,message_table WHERE user_table.user_key = message_table.user_key and message_table.room_id = ? order by message_table.message_time Desc limit 20) A order by A.message_time asc;',
    [req.body.roomid],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(rows);
      }
    },
  );
});
app.post('/showmessageadd', (req, res) => {
  console.log(req.body);
  connection.query(
    'select * from (SELECT user_table.user_key,user_table.user_nickname,message_table.message_body,message_table.message_key,message_table.message_time FROM user_table,message_table WHERE user_table.user_key = message_table.user_key and message_table.room_id = ? order by message_table.message_time Desc limit ?,20) A order by A.message_time Desc;',
    [req.body.roomid, req.body.count * 20],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(rows);
      }
    },
  );
});
app.post('/mynickname', (req, res) => {
  console.log(req.body);
  connection.query(
    'SELECT * FROM user_table where user_key = ?',
    [req.body.touser],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log(rows[0]);
        res.send(rows[0]);
      }
    },
  );
});
app.post('/find_touser', (req, res) => {
  connection.query(
    'insert into reportBan_table (sender_key,report_body,badguy_key) values (?,?,?)',
    [req.body.userkey, req.body.text, req.body.touserkey],
    function (err, rows, field) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        connection.query(
          'select * from reportBan_table where sender_key = ? and report_body = ? and badguy_key = ?',
          [req.body.userkey, req.body.text, req.body.touserkey],
          function (err, rows, field) {
            if (err) {
              console.log(err);
              res.send(false);
            } else {
              const key = rows[0].report_key;
              const messages = req.body.messages;
              console.log(messages);
              messages.map((value, index, arr) => {
                connection.query(
                  'insert into Ban_message_table (report_key,ban_message_body,ban_message_sender) values (?,?,?)',
                  [key, value.message, value.sendid],
                  function (err, rows, field) {
                    if (err) {
                      console.log(err);
                      res.send(false);
                    } else {
                      console.log('성공');
                      res.send(true);
                    }
                  },
                );
              });
            }
          },
        );
      }
    },
  );
});

io.on('connection', function (socket) {
  console.log(socket.id);
  socket.on('groupleave', (data) => {
    socket.leave(data.roomkey + 'group');
    var roomCount = io.sockets.adapter.rooms;
    console.log(roomCount);

    const ids = io
      .of('')
      .in(data.roomkey + 'group')
      .allSockets();
    const arr = [];
    ids.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage.size);
      const test = successMessage.values();
      var i = 0;
      while (i < successMessage.size) {
        arr.push(test.next().value);
        i = i + 1;
      }
      io.to(data.roomkey + 'group').emit('groupsize', arr);
    });
  });
  socket.on('groupjoin', (data) => {
    socket.join(data.groupkey + 'group');
    console.log('그룹방 참가');
    var roomCount = io.sockets.adapter.rooms;
    console.log(roomCount);

    const ids = io
      .of('')
      .in(data.groupkey + 'group')
      .allSockets();
    const arr = [];
    ids.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage.size);
      const test = successMessage.values();
      var i = 0;
      while (i < successMessage.size) {
        arr.push(test.next().value);
        i = i + 1;
      }
      io.to(data.groupkey + 'group').emit('groupsize', arr);
    });
  });
  socket.on('group_sendmessage', (data) => {
    io.to('1group').emit('recieve_groupmessage', data);
  });
  socket.on('onclick_message', (data) => {
    console.log(data.arrendkey + 'end message key');
    console.log('시발 새끼' + data.userkey);
    const index = data.arrendkey + 200;
    const test = {
      string: 'asdasdasdasd',
    };
    const roomsize = data.roomsockets.length;
    const messagedata = {
      key: index,
      name: data.name,
      message: data.message,
      time: data.time,
      sendid: data.userkey,
    };
    console.log('메시지데이터:', data);
    console.log('toshownickname:', data.toshownickname);
    if (data.toshownickname === 1) {
      io.to(JSON.stringify(data.roomid)).emit('shownickname', {
        resultshownickname: 1,
      });
      io.to(JSON.stringify(data.touserkey) + 'user').emit('roomshownickname', {
        roomid: data.roomid,
        resultshownickname: 1,
      });
    }
    io.to(JSON.stringify(data.touserkey) + 'user').emit(
      'recieve_messageroom',
      data,
    );
    io.to(JSON.stringify(data.userkey) + 'user').emit(
      'recieve_messageroom',
      data,
    );
    if (roomsize === 2) {
      io.to(JSON.stringify(data.roomid)).emit('recieve_message', messagedata);
    } else {
      io.to(JSON.stringify(data.roomid)).emit('recieve_message', messagedata);

      connection.query(
        'update participant set count = count + 1 where user_key = ? and room_id = ?',
        [data.touserkey, data.roomid],
        function (err, rows, field) {
          connection.query(
            'SELECT count from participant where user_key =? and room_id =?',
            [data.touserkey, data.roomid],
            function (err, rows, field) {
              console.log('rows', rows[0].count);
              const count = {
                count: rows[0].count,
                roomid: data.roomid,
              };
              console.log(count);
              io.to(JSON.stringify(data.touserkey) + 'user').emit(
                'recieve_ChatNum',
                count,
              );
            },
          );
        },
      );
    }
  });
  socket.on('roomjoin', (data) => {
    socket.join(JSON.stringify(data.roomid));
    console.log(JSON.stringify(data.roomid) + '참가');
    var roomCount = io.sockets.adapter.rooms;
    console.log(roomCount);

    const ids = io.of('').in(JSON.stringify(data.roomid)).allSockets();
    const arr = [];
    socket.emit('socketid', socket.id);
    ids.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage.size);
      const test = successMessage.values();
      var i = 0;
      while (i < successMessage.size) {
        arr.push(test.next().value);
        i = i + 1;
      }
      io.to(JSON.stringify(data.roomid)).emit('roomsockets', arr);
    });
  });
  socket.on('messageroomjoin', (data) => {
    socket.join(JSON.stringify(data) + 'user');
    console.log('메세지룸 접속: ' + JSON.stringify(data));
  });

  socket.on('me', (data) => {
    const ids = io.of('').in('2').allSockets();
    const arr = [];
    ids.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage.size);
      const test = successMessage.values();
      var i = 0;
      while (i < successMessage.size) {
        arr.push(test.next().value);
        i = i + 1;
      }
    });
    console.log(ids);
  });
  socket.on('roomleave', (data) => {
    socket.leave(JSON.stringify(data));
    const ids = io.of('').in('2').allSockets();
    const arr = [];
    ids.then((successMessage) => {
      // successMessage is whatever we passed in the resolve(...) function above.
      // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
      console.log('Yay! ' + successMessage.size);
      const test = successMessage.values();
      var i = 0;
      while (i < successMessage.size) {
        arr.push(test.next().value);
        i = i + 1;
      }
      io.to(JSON.stringify(data)).emit('roomsockets', arr);
    });
  });

  socket.on('singleRoomDel', (data) => {
    console.log('선택방 삭제번호:', data);
    //상대방 유저키 찾기
    //상대방 유저키번호 소켓방으로 삭제되었다는 것 알리기
    connection.query(
      `SELECT count(room_id) as count FROM mydb.participant where room_id = ? and room_del =?`,
      [data.roomid, 0],
      function (err, rows, fields) {
        try {
          //
          if (rows[0].count > 1) {
            //1 최초 삭제 시 participant room_del 에 1 표시하기
            console.log('최초삭제1');
            connection.query(
              `
                UPDATE participant SET room_del = 1 WHERE room_id = ? and user_key != ?`,
              [data.roomid, data.userkey],
              function (err, rows, fields) {
                try {
                  //상대방 유저키 소켓으로 삭제 이벤트 발생 시키기
                  const index = 1;
                  const messagedata = {
                    key: index,
                    name: data.name,
                    message: data.message,
                    time: data.time,
                    sendid: data.userkey,
                  };

                  connection.query(
                    'insert into message_table (room_id,user_key,message_body) values (?,?,?)',
                    [data.roomid, data.userkey, 'delcode5010'],
                    function (err, rows, field) {
                      if (err) {
                        console.log(err);
                      } else {
                        io.to(JSON.stringify(data.touserkey) + 'user').emit(
                          'recieve_messageroom',
                          data,
                        );
                        io.to(JSON.stringify(data.roomid)).emit(
                          'recieve_message',
                          messagedata,
                        );
                        console.log('삭제 되었습니다.');
                      }
                    },
                  );
                } catch (err) {
                  console.log(err);
                }
              },
            );
          } else {
            // 상대방이 나간방 나가기
            console.log('count: ', rows[0].count);
            connection.query(
              'DELETE FROM message_table WHERE room_id =?',
              [data.roomid],
              function (err, rows, fields) {
                try {
                  console.log('메시지 삭제');
                  connection.query(
                    'DELETE FROM participant WHERE room_id =?',
                    [data.roomid],
                    function (err, rows, fields) {
                      try {
                        console.log('participant: 삭제');
                        connection.query(
                          'DELETE FROM messageroom_table where room_id =?',
                          [data.roomid],
                          function (err, rows, fields) {
                            try {
                              console.log('room 삭제');
                              console.log('삭제 완료');
                            } catch (err) {
                              console.log(err);
                            }
                          },
                        );
                      } catch (err) {
                        console.log(err);
                      }
                    },
                  );
                } catch (err) {
                  console.log(err);
                }
              },
            );
          }
        } catch (err) {
          console.log('count err: ', err);
        }
      },
    );
  });
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
