const express = require("express");
const app = express();
const port = 3010;
const cors = require("cors");
const bodyparser = require("body-parser");
// nodemailer 모듈 요청

var http = require("http").createServer(app);


//bodyparser및 cors 사용
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());
// 아이디 중복체크
app.post("/test", (req, res) => {
    console.log(req);
  });
http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
