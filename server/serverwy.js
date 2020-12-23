const express = require('express');
const app = express();
const port = 3002;

const cors = require("cors");
const bodyparser = require("body-parser");
const mysql = require("mysql");
var http = require("http").createServer(app);
const io = require("socket.io")(http);
const route = require("./routes/indexswy");

//mysql연결
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb",
});

connection.connect();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyparser.json());   
app.use("/api", route);

app.post('/GetMessageRoom2', (req, res) =>{
  const userKey = req.body.userKey;
  console.log(userKey);
  connection.query(`SELECT part.room_id, part.user_key, info.user_nickname, info.user_sex 
  FROM participant as part Join user_table as info on part.user_key= info.user_key  
  where room_id in (SELECT room_id FROM participant WHERE user_key = ?) and part.user_key !=?`,
  [userKey, userKey],
  function (err, rows, fields){
    if(err){
      console.log(err+ '채팅방 목록 불러오기에러');
    }else{
      // console.log('방목록:', rows);
      const roomarr = [];
      rows.map((v,i,n)=>{
        roomarr.push(v.room_id)
      })

      const messageRoom = rows
      console.log(messageRoom);
      connection.query(`SELECT TB.message_body, TB.message_time 
        FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY room_id order by message_time desc) as Rnum FROM message_table where room_id in(?))TB 
        where Rnum =1`,
      [roomarr],
      function (err, rows, fields) {
        if(err){
          console.log('TTBTB',err);
        }else{
          const bodyTime = rows;
          console.log(bodyTime);

          const message = [];
          messageRoom.map((info, index) =>{
            message.push({...info, ...bodyTime[index]})
          })
          console.log('통합: ', message);
          res.send(message);
        }
      })
    }
  })
})

app.post('/GetMessageRoom', (req,res) => {
  
  const userKey = req.body.userKey
  connection.query('SELECT room_id FROM participant WHERE user_key = ?',
  [userKey],
  function(err,rows, fields){
    if(err){
      console.log(err+'에러');
    } else{
      const myRoomKey = rows
      console.log('마이룸'+JSON.stringify(myRoomKey));
      connection.query(
        `SELECT user_key, user_sex, user_nickname FROM user_table where user_key in 
          (SELECT user_key FROM participant where room_id in(
          SELECT room_id from messageroom_table WHERE room_name in (SELECT room_name 
                    FROM messageroom_table WHERE room_id in 
                    (SELECT room_id FROM participant WHERE user_key = ?))
                      AND room_id not in (SELECT room_id FROM participant WHERE user_key = ?)
                      AND room_mode = ?))`,
        [userKey, userKey, userKey],
        function(err, rows, fields){
          if (err){
            console.log("에러", err);
          }else{
            const others = rows;
            console.log('others' + JSON.stringify(others));

            const messageRoom = others.reduce((acc, cur, i)=>
              (Object.assign(acc[i],cur),acc),myRoomKey);
            
            // Room2 = Array.from({length:2}, (_, i) => ({...others[i], ...myRoomKey[i]}))
            // Room3 = others.map((id, index) => ({...id,...myRoomKey[index]}))
            console.log("메시지 룸: " +JSON.stringify( messageRoom));
            
            connection.query('SELECT room_id, message_body, message_time FROM message_table where user_key =?',
            
            [userKey],
            function(err, rows, fields){
              if (err){
                console.log('메시지 내용 에러' +err);
              }else{
                console.log("메시지 내용"+JSON.stringify(rows));
                const messageBodyTime = rows;
                const message = others.map((info, index) =>
                  ({...info, ...messageBodyTime[index]})
                )
                console.log(message);
                res.send(message);
              }

            }
            )
            
          }
        }
      )
    }
  })

  
})

io.on("connection", function (socket){

});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})