const express = require('express');
const app = express();
const port = 3001;
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
//snsk3779@

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

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

app.post('/Signup_Delete', async function (req, res, next) {
  const user_id = req.body.user_id;
  connection.query(
    'DELETE FROM user_table WHERE user_id = (?)',
    [user_id],
    function (err, rows, fields) {
      if (!err) {
        res.send(true);
      } else {
        res.send(false);
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
        res.send(false);
      }
    },
  );
});
//로그인 salt 적용
app.post('/login', async function (req, res, next) {
  console.log('login');
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
              if (err) {
                console.log(err);
                res.send(false);
              }
              arr = rows[0];
              connection.query(
                'UPDATE user_table SET user_token = (?) WHERE user_id= (?) and user_pushstate=1',
                [body.token, body.id],
                function (err, rows, fields) {
                  if (err) {
                    console.log(err);
                    res.send(err);
                  }
                  connection.query(
                    'UPDATE user_table SET user_connection_time = Now() WHERE user_key= (?) user_pushstate=1',
                    [userkey],
                    function (err, rows, fields) {
                      if (err) {
                        console.log(err);
                        res.send(err);
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
      if (err) {
        console.log(err);
        res.send(false);
      }
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
      if (err) {
        console.log(err);
        res.send(false);
      }
      if (rows[0] === undefined) {
        console.log('다음x');
        res.send(false);
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
        console.log(err);
        res.send(false);
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
  const key = req.body.key;
  const id = req.body.id;

  // console.log(checkId);
  connection.query(
    'SELECT user_id FROM user_table WHERE user_id =(?)',
    [id],
    function (err, rows, fields) {
      if (rows[0] === undefined) {
        console.log('아이디 중복 없음');
        connection.query(
          'UPDATE user_table SET user_id = (?) WHERE user_key =(?)',
          [id, key],
          function (err, rows, fields) {
            if (err) {
              console.log('changeid error' + err);
              res.send(false);
            } else {
              console.log('changed ok');
              res.send(true);
            }
          },
        );
      } else {
        console.log('아이디 중복');
        res.send(false); // 중복 있음 사용안됨
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
  const nickname = req.body.nickname;
  const key = req.body.key;
  // console.log(req.body);
  connection.query('SELECT * FROM user_table WHERE user_nickname = (?)', [nickname],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      }
      if (rows[0] === undefined) {
        // console.log('CheckNickname true');
        connection.query('UPDATE user_table SET user_nickname = (?) WHERE user_key =(?)',
          [nickname, key], function (err, rows, fields) {
            if (err) {
              console.log('닉네임 변경 에러' + err);
              res.send(false);
            } else {
              console.log('닉네임 변경');
              res.send(true);
            }
          },
        );
      } else {
        console.log('CheckNickname false');
        res.send(false); //중복 있음 사용 불가능
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
        res.send(false);
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
        res.send(false);
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
      res.send(true);
    },
  );
});

var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: 'waglewagle20@gmail.com',
        pass: 'changwon@0',
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: 'waglewagle20@gmail.com',
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
        res.send(false);
      } else {
        connection.query(
          'UPDATE user_table SET user_connection_time = Now() WHERE user_key= (?);',
          [body.user_key],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              res.send(false);
            }
          },
        );
      }
    },
  );
  res.send(true);
});

// ============================ 로그아웃===============================================

app.post('/reset_token', (req, res) => {
  let body = req.body;
  console.log('reset_token');
  console.log(body);
  connection.query(
    'UPDATE user_table SET user_token = (?) WHERE user_key= (?);',
    [0, body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        console.log('asdasd');
        res.send(true);
      }
    },
  );
});

app.post('/reset_token2', (req, res) => {
  let body = req.body;
  console.log(body);
  connection.query(
    'UPDATE user_table SET user_token = (?) WHERE user_key= (?);',
    [0, body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        connection.query(
          'UPDATE user_table SET user_pushstate = (?) WHERE user_key= (?);',
          [body.pid, body.userkey],
          function (err, rows, fields) {
            if (err) {
              console.log(err);
              res.send(false);
            } else {
              res.send(true);
            }
          },
        );
      }
    },
  );
});

app.post('/reset_token3', (req, res) => {
  let body = req.body;
  console.log(body);
  connection.query(
    'UPDATE user_table SET user_NewMsg = (?) WHERE user_key= (?);',
    [body.pid, body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.send(false);
      }
      res.send(true);
    },
  );
});

app.post('/get_message_state', (req, res) => {
  let body = req.body;
  connection.query(
    'select user_pushstate,user_NewMsg from user_table where user_key= (?)',
    [body.userkey],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    },
  );
});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
