const express = require("express");
const app = express();
const port = 3004;
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
    connection.query('SELECT * FROM user_table,message_table WHERE user_table.user_key = message_table.user_key and message_table.room_id = ? order by message_table.message_time;',[req.body.roomid],function(err,rows,field){
        if(err){
            console.log(err);
        }else{
            res.send(rows);
        }
    })
  });
io.on("connection",function(socket){
    console.log("asdasdasd");
    socket.on('onclick_message',(data)=>{
        const index = 1
        const test = {
            string:'asdasdasdasd'
        }
        const messagedata = {key:index,name:data.name,message:data.message,time:data.time}
        io.to(JSON.stringify(data.touserkey)).emit('recieve_messageroom',data);
        io.to(JSON.stringify(data.roomid)).emit('recieve_message',messagedata);
    })
    socket.on('roomjoin',(data)=>{ 
        socket.join(JSON.stringify(data.roomid));
        console.log(JSON.stringify(data.roomid)+'참가');
    })
    socket.on('messageroomjoin',(data)=>{ 
        socket.join(JSON.stringify(data));
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
