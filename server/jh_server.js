const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
//salt 암호화 모듈
const crypto = require("crypto");
// nodemailer 모듈 요청
var http = require("http").createServer(app);

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "snsk3779@",
  database: "mydb",
});

connection.connect();
//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());

app.post("/CheckId", (req, res) => {
  const checkId = req.body.id;
  console.log(checkId);
  connection.query("SELECT user_id FROM user_table WHERE user_id =(?)", [checkId], function (err, rows, fields) {
    if (rows[0] === undefined) {
      console.log("CheckId true");
      res.send(true); //중복 없음 사용가능
    } else {
      console.log("CheckId false");
      res.send(false); // 중복 있음 사용안됨
    }
  });
});

// 회원가입 salt를 이용한 hash 암호화
app.post("/Signup", async function (req, res, next) {
  let body = req.body;
  let inputPassword = body.passwd;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex");
    console.log(req.body);
  connection.query("INSERT INTO user_table (user_id, user_salt, user_passwd, user_sex, user_nickname, user_email) values (?,?,?,?,?,?)", 
  [body.id, salt, hashPassword, body.sex, body.nickname, body.email], function (err, rows, fields) {
    if (err) {
      console.log("sign_up error");
      res.send(false);
    } else {
      console.log("sign_up ok");
      res.send(true);
    }
  });
});

app.post("/Signup2", async function (req, res, next) {
  const user_id = req.body.user_id;
  const major = req.body.major;
  const studno = req.body.studno;

  connection.query("UPDATE user_table SET user_deptno = (?), user_stdno = (?) WHERE user_id = (?)", 
  [major, studno, user_id], function (err, rows, fields) {
    if (!err){
      res.send(true);
    }else {
      console.log("err");
    }
  });
});

//로그인 salt 적용
app.post("/login", async function (req, res, next) {
  let body = req.body;
  connection.query("SELECT user_key,user_id,user_salt,user_passwd FROM user_table WHERE user_id = (?)", [body.id], function (err, rows, fields) {
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
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
});

app.post("/CheckNickname", (req, res) => {
  const nickname = req.body.nickname;
  console.log(nickname);
  connection.query("SELECT user_nickname FROM user_table WHERE user_nickname = (?)", [nickname], function(err, rows, fields){
    if (rows[0] === undefined){
      console.log("CheckNickname true");
      res.send(true);  //중복 없음 사용 가능
    }else{
      console.log("CheckNickname false");
      res.send(false);  //중복 있음 사용 불가능
    }
  });
});

app.post("/Find_idpw", (req, res) => {
  const email = req.body.email;

  connection.query("SELECT user_id FROM user_table WHERE user_email = (?); ", [email], function (err, rows, result) {
    console.log(rows[0]);

    if (rows[0] === undefined) {
      console.log("다음x");
    } else {
      console.log("다음o");
      res.send(rows[0]);
    }
  });
});

app.post("/Find_idpw2", (req, res) => {
  const id = "req.body.user_id";
  let inputPassword = req.body.user_pw;
  let salt = Math.round(new Date().valueOf() * Math.random()) + "";
  let hashPassword = crypto
    .createHash("sha512")
    .update(inputPassword + salt)
    .digest("hex")
    
  connection.query("UPDATE user_table SET user_salt = (?), user_passwd = (?) WHERE user_id = (?)", [salt, hashPassword, id], function (err, rows, result) {
    if (err) {
      console.log("변경x");
      res.send(false);
    } else {
      console.log("변경o");
      res.send(true);
    }
  });
});

app.post("/Sendmail", (req, res) => {
  const email = req.body.sendEmail;
  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }
  let emailParam = {
    toEmail: email + "@changwon.ac.kr", //@changwon.ac.kr
    subject: "와글와글 회원가입 인증 메일입니다.",
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
    
  connection.query("SELECT user_email FROM user_table WHERE user_email = (?)", [email], function (err, rows, fields) {
    if (rows[0] === undefined) {
      //중복된 메일 없음 메일 발송
      console.log("발송");
      mailSender.sendGmail(emailParam);
      res.send(authNum.toString());
    } else {
      console.log("미발송");
      //중복된 메일이 있음
      res.send(true);
    }
  });
});

app.post("/Sendmail2", (req, res) => {
  const email = req.body.sendEmail;

  var authNum = Math.floor(Math.random() * 1000000) + 100000;
  if (authNum > 1000000) {
    authNum = authNum - 100000;
  }

  connection.query("SELECT user_id FROM user_table WHERE user_email = (?); ", [email], function (err, rows, result) {
    if (rows[0] !== undefined) {
    console.log(rows[0]);
    const user_id = {
      id: rows[0].user_id
    };

    let emailParam2 = {
      toEmail: email + "@changwon.ac.kr", //@changwon.ac.kr
      subject: "와글와글 ID/PW찾기 메일입니다.",
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
    console.log("발송");
        mailSender.sendGmail(emailParam2);
        res.send(authNum.toString());
        //가입된 메일이 있음
  } else {
    console.log("미발송");
        res.send(false);
  }
  });
});

app.post("/cancelstate", (req, res) => {
  let body = req.body;
  connection.query("update user_table set user_state=(?) where user_key=(?)", [0, body], function (err, rows, fields) {
    if (err) {
      console.log(err);
    }
  });
});

var mailSender = {
  // 메일발송 함수
  sendGmail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      prot: 465,
      auth: {
        user: "zown98@gmail.com",
        pass: "tkfkd6460",
      },
    });
    // 메일 옵션
    var mailOptions = {
      from: "zown98@gmail.com",
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

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


