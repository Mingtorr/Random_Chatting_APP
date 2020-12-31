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
  password: "root",
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
    console.log(socket.id);

    socket.on('onclick_message',(data)=>{
        const index = 1
        const test = {
            string:'asdasdasdasd'
        }
        const roomsize = data.roomsockets.length
        const messagedata = {key:index,name:data.name,message:data.message,time:data.time}
        console.log('메시지데이터:', data);

        io.to(JSON.stringify(data.touserkey)+'user').emit('recieve_messageroom', data);
        io.to(JSON.stringify(data.userkey)+'user').emit('recieve_messageroom', data);
        if(roomsize === 2){
            io.to(JSON.stringify(data.roomid)).emit('recieve_message', messagedata);
        }else{ 
            io.to(JSON.stringify(data.roomid)).emit('recieve_message', messagedata);

            connection.query('update participant set count = count + 1 where user_key = ? and room_id = ?',
            [data.touserkey, data.roomid],function(err,rows,field){
                connection.query('SELECT count from participant where user_key =? and room_id =?',
                [data.touserkey,data.roomid], function(err, rows, field){
                    console.log('rows',rows[0].count);
                    const count ={
                        count : rows[0].count,
                        roomid: data.roomid
                    }
                    console.log(count);
                    io.to(JSON.stringify(data.touserkey)+'user').emit('recieve_ChatNum', count)
                })
            });
        }
    })
    socket.on('roomjoin',(data)=>{ 
        socket.join(JSON.stringify(data.roomid));
        console.log(JSON.stringify(data.roomid)+'참가');
        var roomCount = io.sockets.adapter.rooms;
        console.log(roomCount);
        
        const ids =  io.of("").in(JSON.stringify(data.roomid)).allSockets();
        const arr = [];
        socket.emit('socketid',socket.id);
        ids.then((successMessage) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
            console.log("Yay! " + successMessage.size);
            const test = successMessage.values();
            var i = 0;
            while(i<successMessage.size){
                arr.push(test.next().value);
                i = i + 1;
            }
            io.to(JSON.stringify(data.roomid)).emit('roomsockets',arr);
          });
        
    })
    socket.on('messageroomjoin',(data)=>{
        socket.join(JSON.stringify(data)+'user');
        console.log('메세지룸 접속: '+ JSON.stringify(data));
    })

    socket.on('me',(data)=>{
        const ids =  io.of("").in("2").allSockets();
        const arr = [];
        ids.then((successMessage) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
            console.log("Yay! " + successMessage.size);
            const test = successMessage.values();
            var i = 0;
            while(i<successMessage.size){
                arr.push(test.next().value);
                i = i + 1;
            }
          });
        console.log(ids);
    
    })
    socket.on('roomleave',(data)=>{
        socket.leave(JSON.stringify(data));
        const ids =  io.of("").in("2").allSockets();
        const arr = [];
        ids.then((successMessage) => {
            // successMessage is whatever we passed in the resolve(...) function above.
            // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
            console.log("Yay! " + successMessage.size);
            const test = successMessage.values();
            var i = 0;
            while(i<successMessage.size){
                arr.push(test.next().value);
                i = i + 1;
            }
            io.to(JSON.stringify(data)).emit('roomsockets',arr);
          });
    })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
