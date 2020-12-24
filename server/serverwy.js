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

app.post('/DelMessageRoom', (req, res) =>{
  console.log(req.body.room_id);
  connection.query(`SELECT count(room_id) as count FROM mydb.participant where room_id = ? and room_del =?`,
  [req.body.room_id, 0],
  function (err, rows, fields) {
    try{ //
      if(rows[0].count > 1){ // 최초 삭제 시 participant room_del 에 1 표시하기
        console.log('최초삭제');
        connection.query(`
        UPDATE participant SET room_del = 1 WHERE room_id = ? and user_key = ?`,
        [req.body.room_id, req.body.user_key],
        function (err, rows, fields) {
          try{
            console.log('삭제 되었습니다.');
          }catch(err){
            console.log(err);
          }
        })
      }else{ // 상대방이 나간방 나가기
        console.log('count: ', rows[0].count);
        //praticipant, room_table, message 삭제
        // console.log(2);
        // connection.query('DELETE FROM participant WHERE room_id = ? ',
        // [req.body.room_id],
        // function (err, rows, fields) {
        //   try{
        //     connection.query(`
        //     DELETE room, message FROM messageroom_table as room inner join message_table as message on room.room_id = message.room_id where room.room_id = ?`,
        //     [req.body.room_id],
        //     function (err, rows, fields) {
        //       try{
        //         console.log('room, message, 삭제 성공');
        //         res.send(true)
        //       }catch(err){
        //         console.log(err);
        //       }
        //     }
        //     )
        //   } catch(err){
        //     console.log(4);
        //     console.log(err);
        //   }

        // })
      }
    } catch(err){
      console.log('count err: ', err);
    }
  })
})

app.post('/GetMessageRoom', (req, res) =>{
  const userKey = req.body.userKey;
  console.log('userkey: ', userKey);
  //문제 : 상대방 parti가 삭제 되면 삭제하지 않은 나도 읽어 오지 못한다.
  //내 parti를 읽어온 뒤 상대방 key를 찾아 메시지방의 상대방 키를 찾음
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
      connection.query(`SELECT TB.message_body, TB.message_time 
        FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY room_id order by message_time desc) as Rnum FROM message_table where room_id in(?))TB 
        where Rnum =1`,
      [roomarr],
      function (err, rows, fields) {
        if(err){
          console.log('라스트 메시지 에러',err);
        }else{
          const bodyTime = rows;

          const message = [];
          messageRoom.map((info, index) =>{
            message.push({...info, ...bodyTime[index]})
          })
          res.send(message);
        }
      })
    }
  })
})

io.on("connection", function (socket){

});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})