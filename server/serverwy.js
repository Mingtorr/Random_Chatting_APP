const express = require('express');
const app = express();
const port = 3001;

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
            console.log("에러");
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