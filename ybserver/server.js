const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
// nodemailer 모듈 요청

var http = require("http").createServer(app);
const io = require("socket.io")(http);

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
// 아이디 중복체크
app.post("/save_message", (req, res) => {
    console.log(req.body);
    connection.query('insert into message_table (room_id,user_key,message_body) values (?,?,?)',[req.body.roomid,req.body.userkey,req.body.message],function(err,rows,field){
        if(err){
            console.log(err);
        }else{
            console.log('성공');
            res.send();
            
        }
    })
  });
  app.post("/showmessage", (req, res) => {
    console.log(req.body);
    const roomname = 'room1';
    connection.query('SELECT * FROM messageRoom_table,message_table WHERE messageRoom_table.room_id = message_table.room_id and messageRoom_table.room_name = ? and message_table.user_key = ?;',[roomname,req.body.userkey],function(err,rows,field){
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            res.send(rows);
        }
    })
  });
io.on("connection",function(socket){
    console.log("asdasdasd");
    socket.on('onclick_message',(message)=>{
        console.log(message);
        const data = {key:2,name:'정영빈',message:message,owner:false}
        io.emit('recieve_message',data);
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
