const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
var http = require('http').createServer(app);

//mysql연결
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'snsk3779@',
  database: 'mydb',
});

connection.connect();

app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

app.post('/receptionOnOff', (req, res) => {
  // console.log('알림 설정', req.body);

  connection.query(
    'UPDATE participant SET reception = ? WHERE room_id = ? and user_key = ?',
    [req.body.reception, req.body.roomid, req.body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    },
  );
});

app.post('/GetMessageRoom', (req, res) => {
  const userKey = req.body.userKey;
  // console.log('userkey: ', userKey);

  connection.query(
    `SELECT part.count, part.room_id, part.user_key,part.shownickname, part.reception as toreception, info.user_nickname, info.user_sex,info.user_token 
    FROM participant as part Join user_table as info on part.user_key= info.user_key  
    where room_id in (SELECT room_id FROM participant WHERE user_key = ?) and part.user_key !=? and part.room_del =0`,
    [userKey, userKey],
    function (err, rows, fields) {
      if (err) {
        console.log(err + '채팅방 목록 불러오기에러');
        res.send(false);
      } else {
        const roomarr = [];
        // console.log('test', rows);
        rows.map((v, i, n) => {
          roomarr.push(v.room_id);
        });
        if (rows[0] === undefined) {
        } else {
          const messageRoom = rows;
          connection.query(
            `SELECT TB.message_body, TB.message_time 
          FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY room_id order by message_time desc) as Rnum FROM message_table where room_id in(?))TB 
          where Rnum =1`,
            [roomarr],
            function (err, rows, fields) {
              if (err) {
                console.log('라스트 메시지 에러', err);
                res.send(false);
              } else {
                const bodyTime = rows;

                const message = [];
                messageRoom.map((info, index) => {
                  message.push({...info, ...bodyTime[index]});
                });
                connection.query(
                  'SELECT count, reception FROM participant where user_key = ?',
                  [userKey],
                  function (err, rows, fields) {
                    // console.log('rororo', rows);
                    const mess = [];
                    message.map((info, index) => {
                      mess.push({...info, ...rows[index]});
                    });
                    // console.log('reception최종', mess);
                    res.send(mess);
                  },
                );
              }
            },
          );
        }
      }
    },
  );
});
app.post('/getshownickname', (req, res) => {
  connection.query(
    'select * from participant where room_id = ? and user_key = ?',
    [req.body.room_id, req.body.user_key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        if (rows[0] != undefined) {
          // console.log('DLDDLDDLDLD' + JSON.stringify(rows[0]));
          res.send(rows[0]);
        }
      }
    },
  );
});
app.post('/ChatNumZero', (req, res) => {
  connection.query(
    'UPDATE participant SET count = 0 WHERE room_id = ? and user_key = ?',
    [req.body.room_id, req.body.user_key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      }
      res.send(true);
    },
  );
});

app.post('/Get_Group', (req, res) => {
  // console.log('그룹');

  connection.query(
    `SELECT Gpart.group_key, Gpart.user_key, Gpart.count, Gmess.group_title, Gmess.group_date 
  FROM group_participant as Gpart join group_table as Gmess on Gpart.group_key = Gmess.group_key
  WHERE Gpart.group_key in (SELECT Gpart.group_key FROM group_participant as Gpart where user_key =? and Gpart.room_del= 0) and Gpart.room_del= 0`,
    [req.body.userKey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        // console.log('그룹', rows);
        if (rows[0] === undefined) {
          res.send(false);
        } else {
          const group_room = [];
          let group = {
            group_key: undefined,
            user_key: [],
            count: 0,
            group_title: '',
            group_date: '',
          };
          const cloneObj = (obj) => JSON.parse(JSON.stringify(obj));
          rows.map((value, index, n) => {
            if (group.group_key === undefined) {
              group.group_key = value.group_key;
              group.user_key.push(value.user_key);
              group.count = value.count;
              group.group_title = value.group_title;
              group.group_date = value.group_date;
              if (rows.length === index + 1) {
                //방에 혼자 있을 때
                if (group_room.length === 0) {
                  const temp = cloneObj(group);
                  group_room[0] = temp;
                } else {
                  const temp = cloneObj(group);
                  group_room[group_room.length] = temp;
                }
              }
            } else if (group.group_key === value.group_key) {
              group.user_key.push(value.user_key);

              if (rows.length === index + 1) {
                //오픈채팅방에 하나만 들어갔을 때
                if (group_room.length === 0) {
                  const temp = cloneObj(group);
                  group_room[0] = temp;
                } else {
                  const temp = cloneObj(group);
                  group_room[group_room.length] = temp;
                }
              }
            } else {
              if (group_room.length === 0) {
                const temp = cloneObj(group);
                group_room[0] = temp;
              } else {
                const temp = cloneObj(group);
                group_room[group_room.length] = temp;
              }
              group.user_key.length = 0;
              group.group_key = value.group_key;
              group.user_key.push(value.user_key);
              group.count = value.count;
              group.group_title = value.group_title;
              group.group_date = value.group_date;
            }
          });
          const group_key = [];
          group_room.map((v, i, n) => {
            group_key.push(v.group_key);
          });
          // console.log('그룹키: ', group_key);
          // console.log('그룹데이터', group_room);
          connection.query(
            `SELECT TB.group_message_body, TB.group_message_time 
        FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY group_key order by group_message_time desc)
        as Rnum FROM group_message_table where group_key in(?))TB where Rnum =1`,
            [group_key],
            function (err, rows, fields) {
              if (err) {
                console.log('err', err);
              } else {
                const groups = [];
                group_room.map((info, index) => {
                  groups.push({...info, ...rows[index]});
                });
                // console.log('데이터완성', groups);
                res.send(groups);
              }
            },
          );
        }
      }
    },
  );
});

app.post('/DelGroupRoom', (req, res) => {
  // console.log('그룹삭제', req.body);
  connection.query(
    `
    UPDATE group_participant SET room_del = 1 WHERE group_key = ? and user_key = ?`,
    [req.body.group_key, req.body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log('err', err);
      }
    },
  );
});

//---------------------------------------------------------

app.post('/heart_reset', (req, res) => {
  // console.log('his');
  let userkey = req.body.userkey;
  let myname = req.body.myname;
  let five = 5;
  // console.log(req.body, userkey, myname);

  connection.query(
    'UPDATE user_table SET user_heart = (?) WHERE user_key = (?)',
    [five, userkey],
    function (err, result) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        // console.log('success');
        res.send(true);
      }
    },
  );
  // connection.query('sql', [heart], function (err) {});
});

app.post('/Heart_number', (req, res) => {
  // console.log('his');
  let userkey = req.body.userkey;
  let myname = req.body.myname;
  // console.log(req.body, userkey, myname);

  connection.query(
    'SELECT user_heart FROM user_table WHERE user_key =(?)',
    [userkey],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        // console.log('없는데?');
        res.send(true); //중복 없음 사용가능
      } else {
        // console.log('있다');
        res.send(rows[0]); // 중복 있음 사용안됨
      }
    },
  );
});

//==============================================하트 감소========================================================================

app.post('/minus_heart', (req, res) => {
  let body = req.body;
  // console.log(body);
  connection.query(
    'select user_heart from user_table where user_key=(?);',
    [body.user_key],
    function (err, rows, fileds) {
      if (err) console.log(err);
      else {
        if (rows[0].user_heart === 0) {
          // console.log('1 rows임', rows);
          res.send(false);
        } else {
          const heart = {
            heart: rows[0].user_heart - 1,
          }; //이렇게 보내면 안됨
          connection.query(
            'UPDATE user_table SET user_heart = (?) WHERE user_key= (?);',
            [heart.heart, body.user_key],
            function (err, rows, fileds) {
              if (err) console.log(err);
              else res.send(heart);
            },
          );
        }
      }
    },
  );
});

//=============================================== solopage =================================================================

app.post('/sendMessage', (req, res) => {
  let body = req.body;
  // console.log(body);
  if (body.deptno !== '') {
    if (body.major !== '') {
      //같은 학과 학번을 선택
      connection.query(
        'select u.user_key, u.token from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and  u.user_deptno=(?) and u.user_stdno= (?) and not u.user_key=(?) and not u.user_NewMsg =1 group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.deptno, body.major, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            // console.log('전송할 유저 없음0');
            res.send(false);
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            if (bool === false) {
              res.send(false);
            } else {
              // console.log(rows[bool]);
              res.send(rows[bool]);
            }
          }
        },
      );
    } else {
      //같은 학과선택 학번은 선택x
      connection.query(
        'select u.user_key from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and  u.user_sex=(?) and u.user_deptno=(?) and not u.user_key=(?) and not u.user_NewMsg =1 group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.deptno, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            // console.log('전송할 유저 없음1');
            res.send(false);
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            if (bool === false) res.send(false);
            else res.send(rows[bool]);
          }
        },
      );
    }
  } else {
    if (body.major !== '') {
      //같은 학과 선택x 학번은 선택
      // console.log('hihi');
      connection.query(
        'select u.user_key from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and u.user_stdno=(?) and not u.user_key=(?) and not u.user_NewMsg =1 group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.major, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            res.send(false);
            // console.log('전송할 유저 없음2');
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            if (bool === false) res.send(false);
            else res.send(rows[bool]);
          }
        },
      );
    } else {
      connection.query(
        'select u.user_key, u.user_token from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and not u.user_key=(?) and not u.user_NewMsg =1 group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.user_key],
        async function (err, rows, fields) {
          // console.log(rows);
          if (rows === undefined) {
            // console.log('쓰레기 유저에게 전송 sex=2인 사람');
            //mkroom(rows[0].user_key, body.user_key, body.message);
            if (body.sex === 0) await sending0(body.user_key, body.message);
            else await sending1(body.user_key, body.message);
            res.send(true);
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            // console.log(bool);
            if (bool === false) {
              if (body.sex === 0) await sending0(body.user_key, body.message);
              else await sending1(body.user_key, body.message);
              // console.log('end');
              res.send(true);
            } else {
              // console.log(rows[bool]);
              res.send(rows[bool]);
            }
          }
        },
      );
    }
  }
});

function loop1(row, user_key, callback) {
  let i = 0;
  async function next() {
    if (i < row.length) {
      var sql =
        'select p1.room_id from participant p1 inner join participant p2 on p1.room_id = p2.room_id and p2.user_key =(?) where p1.user_key=(?);';
      connection.query(sql, [user_key, row[i].user_key], function (err, rows) {
        i++;
        if (rows[0] === undefined) {
          callback(i - 1);
        } else {
          next();
        }
      });
    } else callback(-1);
  }
  next();
}
async function checkroom(row, user_key, message) {
  let room_key = 0;
  let bool;
  await new Promise((resolve) => {
    loop1(row, user_key, function (res) {
      if (res === -1) {
        bool = false;
        resolve();
      } else {
        // console.log('받는사람: ' + row[res].user_key);
        connection.query(
          'INSERT INTO messageroom_table (room_mode) values(1);', // 방만들기
          function (err, rows, fields) {
            if (err) console.log(err);
            else {
              // console.log(rows.insertId); //추가한 방번호pk
              room_key = rows.insertId;
              connection.query(
                'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
                [room_key, row[res].user_key, 1, 0, 0],
                function (err, rows, fields) {
                  if (err) console.log(err);
                  connection.query(
                    'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
                    [room_key, user_key, 0, 0, 1],
                    function (err, rows, fields) {
                      if (err) console.log(err);
                      connection.query(
                        'INSERT INTO message_table (room_id,user_key,message_body) values(?,?,?);',
                        [room_key, user_key, message],
                        function (err, rows, fields) {
                          if (err) console.log(err);
                          // console.log('매칭 완료');
                          bool = res;
                          resolve();
                        },
                      );
                    },
                  );
                },
              );
            }
          },
        );
      }
    });
  });
  // console.log(bool);
  return bool;
}

async function sending0(user_key, message) {
  let room_key = 0;
  await new Promise((resolve) => {
    connection.query(
      'INSERT INTO messageroom_table (room_mode) values(1);', // 방만들기
      function (err, rows, fields) {
        if (err) console.log(err);
        else {
          // console.log(rows.insertId); //추가한 방번호pk
          // console.log('쓰레기에 전송');
          room_key = rows.insertId;
          connection.query(
            'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
            [room_key, 0, 0, 0, 0],
            function (err, rows, fields) {
              if (err) console.log(err);
              connection.query(
                'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
                [room_key, user_key, 0, 0, 1],
                function (err, rows, fields) {
                  if (err) console.log(err);
                  connection.query(
                    'INSERT INTO message_table (room_id,user_key,message_body) values(?,?,?);',
                    [room_key, user_key, message],
                    function (err, rows, fields) {
                      if (err) console.log(err);
                      // console.log('매칭 완료');
                      resolve();
                    },
                  );
                },
              );
            },
          );
        }
      },
    );
  });
  return;
}

async function sending1(user_key, message) {
  let room_key = 0;
  await new Promise((resolve) => {
    connection.query(
      'INSERT INTO messageroom_table (room_mode) values(1);', // 방만들기
      function (err, rows, fields) {
        if (err) console.log(err);
        else {
          // console.log(rows.insertId); //추가한 방번호pk
          // console.log('쓰레기에 전송');
          room_key = rows.insertId;
          connection.query(
            'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
            [room_key, 0, 1, 0, 0],
            function (err, rows, fields) {
              if (err) console.log(err);
              connection.query(
                'INSERT INTO participant (room_id,user_key,count,room_del,shownickname) values(?,?,?,?,?)',
                [room_key, user_key, 0, 0, 1],
                function (err, rows, fields) {
                  if (err) console.log(err);
                  connection.query(
                    'INSERT INTO message_table (room_id,user_key,message_body) values(?,?,?);',
                    [room_key, user_key, message],
                    function (err, rows, fields) {
                      if (err) console.log(err);
                      // console.log('매칭 완료');
                      resolve();
                    },
                  );
                },
              );
            },
          );
        }
      },
    );
  });
  return;
}

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});