const express = require("express");
const router = express.Router();
var http = require("http").createServer(router);
const mysql = require("mysql");
// nodemailer 모듈 요청
const nodemailer = require("nodemailer");
//salt 암호화 모듈
const crypto = require("crypto");
const app = express();

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "snsk3779@",
  database: "mydb",
});

connection.connect();

router.post("/CheckId", (req, res) => {
  const checkId = req.body.check_Id;
  connection.query("SELECT user_id FROM user_info WHERE user_id =(?)", [checkId], function (err, rows, fields) {
    if (rows[0] === undefined) {
      res.send(true); //중복 없음 사용가능
    } else {
      res.send(false); // 중복 있음 사용안됨
    }
  });
});

// 회원가입 salt를 이용한 hash 암호화
router.post("/Signup", async function (req, res, next) {
  let body = req.body;
  let inputPassword = body.passwd;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
  connection.query("insert into user_info (user_id,user_salt, user_passwd, user_email) values (?,?,?,?)", [body.id, salt, hashPassword, body.email], function (err, rows, fields) {
    if (err) {
      console.log("sign_up error");
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

//로그인 salt 적용
router.post("/login", async function (req, res, next) {
  let body = req.body;
  connection.query("SELECT user_key,user_id,user_salt,user_passwd FROM user_info WHERE user_id = (?)", [body.id], function (err, rows, fields) {
    if (rows === undefined || rows[0] === undefined) {
      res.send(false);
    } else {
      let dbPassword = rows[0].user_passwd;
      let salt = rows[0].user_salt;
      let inputPassword = body.passwd;

      let hashPassword = crypto
        .createHash("sha512")
        .update(inputPassword + salt)
        .digest("hex");
      if (dbPassword === hashPassword) {
        res.send(rows);
      } else {
        res.send(false);
      }
    }
  });
});

router.post("/getCity", (req, res) => {
  let state = req.body.state;
  connection.query("SELECT DISTINCT second FROM api_data WHERE first = (?)", [state], function (err, rows, fields) {
    res.send(rows);
  });
});

router.post("/getCity2", (req, res) => {
  let body = req.body;
  connection.query("SELECT DISTINCT third FROM api_data WHERE first = (?) and second = (?)", [body.city1, body.city2], function (err, rows, fields) {
    res.send(rows);
  });
});

router.post("/getCity3", (req, res) => {
  let body = req.body;
  connection.query("SELECT nx, ny FROM api_data WHERE first = (?) and second = (?) and third = (?)", [body.city1, body.city2, body.city3], function (err, rows, fields) {
    res.send(rows);
  });
});

router.post("/Sendmail", (req, res) => {
  const email = req.body.sendEmail;
  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }

  let emailParam = {
    toEmail: email,
    subject: "회원가입 인증 메일입니다.",
    html: ` <body style="margin: 0; padding: 0">
    <div style=
      "font-family:Apple SD Gothic Neo, sans-serif ; width: 540px; height: 600px; border-top: 4px solid #6f9df1;
      margin: 100px auto; padding: 30px 0; box-sizing: border-box; ">
      <h1 style=" margin: 0; padding: 0 5px; font-size: 28px; font-weight: 400">
      <span style="font-size: 15px; margin: 0 0 10px 3px">창원대 우산알리미</span><br />
      <b style="color: #6f9df1">메일인증</b> 안내입니다.
      </h1>
      <p style="
            font-size: 16px;
            line-height: 26px;
            margin-top: 50px;
            padding: 0 5px;
          ">
        안녕하세요.<br />
        <b style="color: #6f9df1">우산알리미</b>에 가입해 주셔서 진심으로
        감사드립니다.<br />
        아래
        <b style="color: #6f9df1">'인증 번호'</b>를 입력하여 회원가입을 완료해
        주세요.<br />
        감사합니다. <br /><br />
        인증번호: ${authNum}
        <script>
          document.write(authNumber);
        </script>
      </p>
  
      <a style="color: #fff; text-decoration: none; text-align: center" href="{$auth_url}" target="_blank">
        <p style="
              display: inline-block;
              width: 210px;
              height: 45px;
              margin: 30px 5px 40px;
              background: #2d73f5;
              line-height: 45px;
              vertical-align: middle;
              font-size: 16px;
            " class="move_wagle">
          우산알리미 홈페이지 이동
        </p>
      </a>
  
      <div style="border-top: 1px solid #ddd; padding: 5px">
        <p style="font-size: 13px; line-height: 21px; color: #555">
          만약 버튼이 정상적으로 클릭되지 않는다면, 아래 링크를 복사하여 접속해
          주세요.<br />
          <a href="http://34.64.249.23/" style="text-decoration: underline; color: blue;">우산알리미</a>
        </p>
      </div>
    </div>
  </body>`,
  };
  connection.query("SELECT user_email FROM user_info WHERE user_email = (?)", [email], function (err, rows, fields) {
    if (rows[0] === undefined) {
      //중복된 메일 없음 메일 발송
      mailSender.sendGmail(emailParam);
      res.send(authNum.toString());
    } else {
      //중복된 메일이 있음
      res.send(true);
    }
  });
});

router.post("/storeData", (req, res) => {
  let body = req.body;
  connection.query("update user_info set user_sendtime =(?), user_state=(?) where user_key= (?)", [body[0], "1", body[6]], function (err, rows, fields) {
    connection.query("SELECT user_key FROM location_table WHERE user_key = (?)", body[6], function (err, rows, fields) {
      if (rows[0] === undefined) {
        connection.query("insert into location_table (state,city, address, nx,ny, user_key) values (?,?,?,?,?,?)", [body[1], body[2], body[3], body[4], body[5], body[6]], function (err, rows, fields) {});
      } else {
        connection.query("update location_table set state=(?), city=(?), address=(?), nx=(?),ny=(?) where user_key=(?)", [body[1], body[2], body[3], body[4], body[5], body[6]], function (err, rows, fields) {});
      }
    });
  });
});

router.post("/cancelstate", (req, res) => {
  let body = req.body;
  connection.query("update user_info set user_state=(?) where user_key=(?)", [0, body], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }
  });
});

router.post("/getuserState", (req, res) => {
  let body = req.body;
  connection.query("SELECT D.state, D.city, D.address, E.user_sendtime FROM user_info E JOIN location_table D ON E.user_key = D.user_key and D.user_key= (?) and E.user_state=1", [body.userkey], function (err, rows, fields) {
    res.send(rows);
  });
});

//////////////////////////////////
router.post('/Test', (req,res) => {
  
  console.log("sexsex");

  let body = req.body
  connection.query(
    'UPDATE messageroom_table SET room_id = (?), room_name =(?)',
    [body.test, body.test1],
    function(err, rows,fields){
      if (err){
        console.log("에러");
      }else{
        console.log("입력");
        res.send(true);
      }
    }
  )
})

var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      prot: 465,
      auth: {
        user: "cwnunight@gmail.com",
        pass: "qcqkmnyluawvkvbm",
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: "cwnunight@gmail.com",
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      html: param.html, // 메일 내용
    };
    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};

module.exports = router;
