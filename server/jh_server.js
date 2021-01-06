const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
//salt 암호화 모듈
const crypto = require('crypto');
const {callbackPromise} = require('nodemailer/lib/shared');
// nodemailer 모듈 요청
var http = require('http').createServer(app);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jeong1207',
  database: 'mydb',
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());
//====휘제============================================================================================
app.post('/heart_reset', (req, res) => {
  console.log('his');
  let userkey = req.body.userkey;
  let myname = req.body.myname;
  let five = 5;
  console.log(req.body, userkey, myname);

  connection.query(
    'UPDATE user_table SET user_heart = (?) WHERE user_key = (?)',
    [five, userkey],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('success');
      }
    },
  );
  // connection.query('sql', [heart], function (err) {});
});

app.post('/Heart_number', (req, res) => {
  console.log('his');
  let userkey = req.body.userkey;
  let myname = req.body.myname;
  console.log(req.body, userkey, myname);

  connection.query(
    'SELECT user_heart FROM user_table WHERE user_key =(?)',
    [userkey],
    function (err, rows, fields) {
      console.log(rows[0], 'hi');
      if (rows[0] === undefined) {
        console.log('없는데?');
        res.send(true); //중복 없음 사용가능
      } else {
        console.log('있다');
        res.send(rows[0]); // 중복 있음 사용안됨
      }
    },
  );
});
//================================================================================================

app.post('/CheckId', (req, res) => {
  const checkId = req.body.id;
  console.log(checkId);
  connection.query(
    'SELECT user_id FROM user_table WHERE user_id =(?)',
    [checkId],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        console.log('CheckId true');
        res.send(true); //중복 없음 사용가능
      } else {
        console.log('CheckId false');
        res.send(false); // 중복 있음 사용안됨
      }
    },
  );
});

// 회원가입 salt를 이용한 hash 암호화
app.post('/Signup', async function (req, res, next) {
  let body = req.body;
  let inputPassword = body.passwd;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');
  console.log(req.body);
  connection.query(
    'INSERT INTO user_table (user_id, user_salt, user_passwd, user_sex, user_nickname, user_email) values (?,?,?,?,?,?)',
    [body.id, salt, hashPassword, body.sex, body.nickname, body.email],
    function (err, rows, fields) {
      if (err) {
        console.log('sign_up error', err);
        res.send(false);
      } else {
        console.log('sign_up ok');
        res.send(true);
      }
    },
  );
});

app.post('/Signup2', async function (req, res, next) {
  const user_id = req.body.user_id;
  const major = req.body.major;
  const studno = req.body.studno;

  connection.query(
    'UPDATE user_table SET user_deptno = (?), user_stdno = (?) WHERE user_id = (?)',
    [major, studno, user_id],
    function (err, rows, fields) {
      if (!err) {
        res.send(true);
      } else {
        console.log('err');
      }
    },
  );
});

//로그인 salt 적용
app.post('/login', async function (req, res, next) {
  let body = req.body;
  let userkey;
  let arr;
  connection.query(
    'SELECT user_key, user_id, user_salt,user_passwd FROM user_table WHERE user_id = (?)',
    [body.id],
    function (err, rows, fields) {
      if (rows === undefined || rows[0] === undefined) {
        res.send(false);
      } else {
        userkey = rows[0].user_key;
        let dbPassword = rows[0].user_passwd;
        let salt = rows[0].user_salt;
        let inputPassword = body.passwd;

        let hashPassword = crypto
          .createHash('sha512')
          .update(inputPassword + salt)
          .digest('hex');

        if (dbPassword === hashPassword) {
          connection.query(
            'SELECT user_key, user_sex, user_email, user_deptno, user_stdno, user_nickname FROM user_table WHERE user_id = (?)',
            [body.id],
            function (err, rows, fields) {
              //res.send(rows[0]);
              arr = rows[0];
              connection.query(
                'UPDATE user_table SET user_token = (?) WHERE user_id= (?)',
                [body.token, body.id],
                function (err, rows, fields) {
                  if (err) {
                    console.log(err);
                  }
                  connection.query(
                    'UPDATE user_table SET user_connection_time = Now() WHERE user_key= (?)',
                    [userkey],
                    function (err, rows, fields) {
                      if (err) {
                        console.log(err);
                      } else {
                        res.send(arr);
                      }
                    },
                  );
                },
              );
            },
          );
        } else {
          console.log('로그인 에러');
          res.send(false);
        }
      }
    },
  );
});

app.post('/CheckNickname', (req, res) => {
  const nickname = req.body.nickname;
  console.log(req.body);
  connection.query(
    'SELECT * FROM user_table WHERE user_nickname = (?)',
    [nickname],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        console.log('CheckNickname true');
        res.send(true); //중복 없음 사용 가능
      } else {
        console.log('CheckNickname false');
        res.send(false); //중복 있음 사용 불가능
      }
    },
  );
});

app.post('/Find_idpw', (req, res) => {
  const email = req.body.email;

  connection.query(
    'SELECT user_id FROM user_table WHERE user_email = (?); ',
    [email],
    function (err, rows, result) {
      console.log(rows[0]);

      if (rows[0] === undefined) {
        console.log('다음x');
      } else {
        console.log('다음o');
        res.send(rows[0]);
      }
    },
  );
});

app.post('/Find_idpw2', (req, res) => {
  const id = 'req.body.user_id';
  let inputPassword = req.body.user_pw;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');

  connection.query(
    'UPDATE user_table SET user_salt = (?), user_passwd = (?) WHERE user_id = (?)',
    [salt, hashPassword, id],
    function (err, rows, result) {
      if (err) {
        console.log('변경x');
        res.send(false);
      } else {
        console.log('변경o');
        res.send(true);
      }
    },
  );
});

app.post('/call', (req, res) => {
  const key = req.body.key;
  // console.log(req.body.key);
  connection.query(
    'SELECT * from user_table WHERE user_key = (?)',
    [key],
    function (err, rows, result) {
      if (err) {
        // console.log('call fail');
        // console.log(err);
      } else {
        // console.log('call good');
        res.send(rows[0]);
        console.log(rows);
      }
    },
  );
});
//회원탈퇴
app.post('/withdrawal', (req, res) => {
  const key = req.body.key;
  connection.query(
    'DELETE from user_table WHERE user_key = (?)',
    [key],
    function (err, rows, result) {
      if (err) {
        console.log(err);
        console.log('withdrawal fail');
        res.send(false);
      } else {
        console.log('withdrawal good');
        // console.log(rows);
        res.send(true);
      }
    },
  );
});
//아이디 변경
app.post('/ChangeId', (req, res) => {
  const changeId = req.body.id;
  const key = req.body.key;
  // console.log(ChangeId);
  connection.query(
    'UPDATE user_table SET user_id = (?) WHERE user_key =(?)',
    [changeId, key],
    function (err, rows, fields) {
      if (err) {
        console.log('changeid error' + err);
      } else {
        console.log('changed good');
        res.send(true);
      }
    },
  );
});
//비밀번호 변경
app.post('/ChangePass', async function (req, res, next) {
  // let body = req.body;
  const key = req.body.key;
  let inputPassword = req.body.pass;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');
  // console.log(req.body);
  connection.query(
    'UPDATE user_table SET user_passwd = (?), user_salt = (?) WHERE user_key= (?)',
    [hashPassword, salt, key],
    function (err, rows, fields) {
      if (err) {
        console.log('change passwd error', err);
        res.send(false);
      } else {
        console.log('change passwd ok');
        res.send(true);
      }
    },
  );
});
//닉네임 변경
app.post('/ChangeNickname', (req, res) => {
  const changenickname = req.body.nickname;
  const key = req.body.key;
  // console.log(ChangeId);
  connection.query(
    'UPDATE user_table SET user_nickname = (?) WHERE user_key =(?)',
    [changenickname, key],
    function (err, rows, fields) {
      if (err) {
        console.log('changenick error' + err);
      } else {
        console.log('changnickname good');
        res.send(true);
      }
    },
  );
});
//학과 설정
app.post('/Setdeptno', (req, res) => {
  const key = req.body.key;
  const deptno = req.body.deptno;
  connection.query(
    'UPDATE user_table SET user_deptno = (?) WHERE user_key = (?)',
    [deptno, key],
    function (err, rows, fields) {
      if (err) {
        console.log('setdeptno error' + err);
      } else {
        console.log('setdeptno good');
        res.send(true);
      }
    },
  );
});
//학번 설정
app.post('/Setstdno', (req, res) => {
  // console.log(req.body);
  const key = req.body.key;
  const stdno = req.body.stdno;
  connection.query(
    'UPDATE user_table SET user_stdno = (?) WHERE user_key = (?)',
    [stdno, key],
    function (err, rows, fields) {
      if (err) {
        console.log('setstdno error' + err);
      } else {
        console.log('setstdno good');
        res.send(true);
      }
    },
  );
});
app.post('/Sendmail', (req, res) => {
  const email = req.body.sendEmail;
  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }
  console.log(authNum);
  let emailParam = {
    toEmail: email + '@changwon.ac.kr', //@changwon.ac.kr
    subject: '와글와글 회원가입 인증 메일입니다.',
    html: `<body style="margin: 0; padding: 0">
      <div style=
        font-family: " Apple SD Gothic Neo", "sans-serif" ; width: 540px; height: 600px; border-top: 4px solid #f05052;
        margin: 100px auto; padding: 30px 0; box-sizing: border-box; ">
        <h1 style=" margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400">
        <span style="font-size: 15px; margin: 0 0 10px 3px">창원대 과팅앱</span><br />
        <b style="color: #f05052">메일인증</b> 안내입니다.
        </h1>
        <p style="
              font-size: 16px;
              line-height: 26px;
              margin-top: 50px;
              padding: 0 5px;
            ">
          안녕하세요.<br />
          <b style="color: #f05052">와글와글</b>에 가입해 주셔서 진심으로
          감사드립니다.<br />
          아래
          <b style="color: #f05052">'인증 번호'</b>를 입력하여 회원가입을 완료해
          주세요.<br />
          감사합니다. <br /><br />
          인증번호: ${authNum}
          <script>
            document.write(authNumber);
          </script>
        </p>
      </div>
    </body>`,
  };

  connection.query(
    'SELECT user_email FROM user_table WHERE user_email = (?)',
    [email],
    function (err, rows, fields) {
      console.log('발송');
      mailSender.sendGmail(emailParam);
      res.send(authNum.toString());

      // if (rows[0] === undefined) {
      //   //중복된 메일 없음 메일 발송
      //   console.log("발송");
      //   mailSender.sendGmail(emailParam);
      //   res.send(authNum.toString());
      // } else {
      //   console.log("미발송");
      //   //중복된 메일이 있음
      //   res.send(true);
      // }
    },
  );
});

app.post('/Sendmail2', (req, res) => {
  const email = req.body.sendEmail;

  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }

  connection.query(
    'SELECT user_id FROM user_table WHERE user_email = (?); ',
    [email],
    function (err, rows, result) {
      if (rows[0] !== undefined) {
        console.log(rows[0]);
        const user_id = {
          id: rows[0].user_id,
        };

        let emailParam2 = {
          toEmail: email + '@changwon.ac.kr', //@changwon.ac.kr
          subject: '와글와글 ID/PW찾기 메일입니다.',
          html: `<body style="margin: 0; padding: 0">
        <div style=
          font-family: " Apple SD Gothic Neo", "sans-serif" ; width: 540px; height: 600px; border-top: 4px solid #f05052;
          margin: 100px auto; padding: 30px 0; box-sizing: border-box; ">
          <h1 style=" margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400">
          <span style="font-size: 15px; margin: 0 0 10px 3px">창원대 과팅앱</span><br />
          <b style="color: #f05052">ID/PW찾기</b> 안내입니다.
          </h1>
          <p style="
                font-size: 16px;
                line-height: 26px;
                margin-top: 50px;
                padding: 0 5px;
              ">
            회원님의 아이디는 '${user_id.id}'입니다.<br /><br/>
            <b style="color: #f05052">와글와글</b>
            아래
            <b style="color: #f05052">'인증 번호'</b>를 입력하여 ID/PW찾기를 진행해주세요.<br />
            감사합니다. <br /><br />
            인증번호: ${authNum}
            <script>
              document.write(authNumber);
            </script>
          </p>
        </div>
      </body>`,
        };
        console.log('발송');
        mailSender.sendGmail(emailParam2);
        res.send(authNum.toString());
        //가입된 메일이 있음
      } else {
        console.log('미발송');
        res.send(false);
      }
    },
  );
});

app.post('/cancelstate', (req, res) => {
  let body = req.body;
  connection.query(
    'update user_table set user_state=(?) where user_key=(?)',
    [0, body],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
    },
  );
});

var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      prot: 465,
      auth: {
        user: 'wjddudqls96@gmail.com',
        pass: 'snsk3779@',
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: 'wjddudqls96@gmail.com',
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      html: param.html, // 메일 내용
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
};

//==============================================하트 감소========================================================================

app.post('/minus_heart', (req, res) => {
  let body = req.body;
  console.log(body);
  connection.query(
    'select user_heart from user_table where user_key=(?);',
    [body.user_key],
    function (err, rows, fileds) {
      if (err) console.log(err);
      else {
        if (rows[0].user_heart === 0) res.send(false);
        else {
          let heart = rows[0].user_heart - 1;
          connection.query(
            'UPDATE user_table SET user_heart = (?) WHERE user_key= (?);',
            [heart, body.user_key],
            function (err, rows, fileds) {
              if (err) console.log(err);
              else res.send(heart);
            },
          );
        }
      }
    },
  );
  res.send(false);
});
//=============================================== 첫 접속하기 =================================================================
app.post('/onMain', (req, res) => {
  let body = req.body;
  console.log(body);
  connection.query(
    'UPDATE user_table SET user_token = (?) WHERE user_key= (?);',
    [body.token, body.user_key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        connection.query(
          'UPDATE user_table SET user_connection_time = Now() WHERE user_key= (?);',
          [body.user_key],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
            }
          },
        );
      }
    },
  );
  res.send(true);
});

//=============================================== solopage =================================================================

app.post('/sendMessage', (req, res) => {
  let body = req.body;
  console.log(body);
  if (body.deptno !== '') {
    if (body.major !== '') {
      //같은 학과 학번을 선택
      connection.query(
        'select u.user_key, u.token from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and  u.user_deptno=(?) and u.user_stdno= (?) and not u.user_key=(?) group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.deptno, body.major, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            console.log('전송할 유저 없음0');
            res.send(false);
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            if (bool === false) {
              res.send(false);
            } else {
              console.log(rows[bool]);
              res.send(rows[bool]);
            }
          }
        },
      );
    } else {
      //같은 학과선택 학번은 선택x
      connection.query(
        'select u.user_key from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and  u.user_sex=(?) and u.user_deptno=(?) and not u.user_key=(?) group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.deptno, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            console.log('전송할 유저 없음1');
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
      console.log('hihi');
      connection.query(
        'select u.user_key from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and u.user_stdno=(?) and not u.user_key=(?) group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.major, body.user_key],
        async function (err, rows, fields) {
          if (rows[0] === undefined) {
            res.send(false);
            console.log('전송할 유저 없음2');
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
        'select u.user_key, u.user_token from user_table u LEFT OUTER JOIN participant p on u.user_key= p.user_key where u.user_connection_time > (NOW() - INTERVAL 15 DAY) and u.user_sex=(?) and not u.user_key=(?) group by u.user_key having count(u.user_key)<20 order by count(u.user_key);',
        [body.sex, body.user_key],
        async function (err, rows, fields) {
          console.log(rows);
          if (rows === undefined) {
            console.log('쓰레기 유저에게 전송 sex=2인 사람');
            //mkroom(rows[0].user_key, body.user_key, body.message);
            await sending1(body.user_key, body.message);
            res.send(true);
          } else {
            // 전송할 유저 찾음
            let bool = await checkroom(rows, body.user_key, body.message);
            console.log(bool);
            if (bool === false) {
              await sending1(body.user_key, body.message);
              console.log('end');
              res.send(true);
            } else {
              console.log('eeeeeeeeee');
              console.log(rows[bool]);
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
        console.log('받는사람: ' + row[res].user_key);
        connection.query(
          'INSERT INTO messageroom_table (room_mode) values(1);', // 방만들기
          function (err, rows, fields) {
            if (err) console.log(err);
            else {
              console.log(rows.insertId); //추가한 방번호pk
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
                          if (err) console.lo(err);
                          console.log('매칭 완료');
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
  console.log(bool);
  return bool;
}

async function sending1(user_key, message) {
  let room_key = 0;
  await new Promise((resolve) => {
    connection.query(
      'INSERT INTO messageroom_table (room_mode) values(1);', // 방만들기
      function (err, rows, fields) {
        if (err) console.log(err);
        else {
          console.log(rows.insertId); //추가한 방번호pk
          console.log('쓰레기에 전송');
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
                      console.log('매칭 완료');
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
