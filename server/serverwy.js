const express = require('express');
const app = express();
const port = 3002;

const cors = require('cors');
const bodyparser = require('body-parser');
const mysql = require('mysql');
var http = require('http').createServer(app);
const io = require('socket.io')(http);

//mysql연결
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2ajrrhtlvj',
  database: 'mydb',
});

connection.connect();

app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

app.post('/DelMessageRoom', (req, res) => {
  console.log(req.body.room_id);
  connection.query(
    `SELECT count(room_id) as count FROM mydb.participant where room_id = ? and room_del =?`,
    [req.body.room_id, 0],
    function (err, rows, fields) {
      try {
        //
        if (rows[0].count > 1) {
          // 최초 삭제 시 participant room_del 에 1 표시하기
          console.log('최초삭제');
          connection.query(
            `
        UPDATE participant SET room_del = 1 WHERE room_id = ? and user_key = ?`,
            [req.body.room_id, req.body.user_key],
            function (err, rows, fields) {
              try {
                console.log('삭제 되었습니다.');
              } catch (err) {
                console.log(err);
              }
            },
          );
        } else {
          // 상대방이 나간방 나가기
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
      } catch (err) {
        console.log('count err: ', err);
      }
    },
  );
});

app.post('/GetMessageRoom', (req, res) => {
  const userKey = req.body.userKey;
  console.log('userkey: ', userKey);
  //문제 : 상대방 parti가 삭제 되면 삭제하지 않은 나도 읽어 오지 못한다.
  //내 parti를 읽어온 뒤 상대방 key를 찾아 메시지방의 상대방 키를 찾음
  connection.query(
    `SELECT part.count, part.room_id, part.user_key, info.user_nickname, info.user_sex 
  FROM participant as part Join user_table as info on part.user_key= info.user_key  
  where room_id in (SELECT room_id FROM participant WHERE user_key = ?) and part.user_key !=? and part.room_del =0`,
    [userKey, userKey],
    function (err, rows, fields) {
      if (err) {
        console.log(err + '채팅방 목록 불러오기에러');
      } else {
        // console.log('방목록:', rows);
        const roomarr = [];
        rows.map((v, i, n) => {
          roomarr.push(v.room_id);
        });

        const messageRoom = rows;
        connection.query(
          `SELECT TB.message_body, TB.message_time 
        FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY room_id order by message_time desc) as Rnum FROM message_table where room_id in(?))TB 
        where Rnum =1`,
          [roomarr],
          function (err, rows, fields) {
            if (err) {
              console.log('라스트 메시지 에러', err);
            } else {
              const bodyTime = rows;

              const message = [];
              messageRoom.map((info, index) => {
                message.push({...info, ...bodyTime[index]});
              });
              connection.query(
                'SELECT count FROM participant where user_key = ?',
                [userKey],
                function (err, rows, fields) {
                  const mess = [];
                  message.map((info, index) => {
                    mess.push({...info, ...rows[index]});
                  });
                  res.send(mess);
                },
              );
            }
          },
        );
      }
    },
  );
});

app.post('/ChatNumZero', (req, res) => {
  connection.query(
    'UPDATE participant SET count = 0 WHERE room_id = ? and user_key = ?',
    [req.body.room_id, req.body.user_key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }
    },
  );
});

app.post('Del_message', (req,res) =>{
  console.log('삭제', req.body);
    
    connection.query('insert into message_table (room_id,user_key,message_body) values (?,?,?)',
    [req.body.roomid,req.body.userkey,'delcode5010'],function(err,rows,field){
        if(err){
            console.log(err);
        }else{
            console.log('성공');
            res.send();
        }
    })
})

app.post('/Get_Group', (req, res) =>{
  console.log('그룹');
  
  connection.query(
  `SELECT Gpart.group_key, Gpart.user_key, Gpart.count, Gmess.group_title, Gmess.group_date 
  FROM group_participant as Gpart join group_table as Gmess on Gpart.group_key = Gmess.group_key
  WHERE Gpart.group_key in (SELECT Gpart.group_key FROM group_participant as Gpart where user_key =?) and Gpart.room_del= 0`,
  [req.body.userKey], function(err, rows, fields){
    if(err){
      console.log(err);
    }else{
      console.log('그룹', rows);
      const group_room =[];
      let group = {
        group_key: undefined,
        user_key: [],
        count: 0,
        group_title:'',
        group_date:'',
      };
      const cloneObj = obj => JSON.parse(JSON.stringify(obj));
      rows.map((value,index,n) =>{
        if(group.group_key === undefined){
          group.group_key = value.group_key;
          group.user_key.push(value.user_key)
          group.count = value.count
          group.group_title = value.group_title
          group.group_date = value.group_date
          if(rows.length === index+1){ //방에 혼자 있을 때
            if(group_room.length === 0){
              const temp = cloneObj(group)
              group_room[0] = temp
            }else{
              const temp = cloneObj(group)
              group_room[group_room.length] = temp
            }
          }
        } else if(group.group_key === value.group_key){
          group.user_key.push(value.user_key)

          if(rows.length === index+1){ //오픈채팅방에 하나만 들어갔을 때
            if(group_room.length === 0){
              const temp = cloneObj(group)
              group_room[0] = temp
            }else{
              const temp = cloneObj(group)
              group_room[group_room.length] = temp
            }
          }
          
        } else{
          if(group_room.length === 0){
            const temp = cloneObj(group)
            group_room[0] = temp
          }else{
            const temp = cloneObj(group)
            group_room[group_room.length] = temp
          }
          group.user_key.length =0;
          group.group_key = value.group_key;
          group.user_key.push(value.user_key)
          group.count = value.count
          group.group_title = value.group_title
          group.group_date = value.group_date
        }
      })
      const group_key =[]
      group_room.map((v,i,n) =>{
        group_key.push(v.group_key);
      })
      console.log('그룹데이터', group_room);
      connection.query(`SELECT TB.group_message_body, TB.group_message_time 
      FROM(SELECT *, ROW_NUMBER() OVER(PARTITION BY group_key order by group_message_time desc)
      as Rnum FROM group_message_table where group_key in(?))TB where Rnum =1`,
      [group_key],function(err, rows, fields){
        if(err){
          console.log('err', err);
        }else{
          const groups= [];
          group_room.map((info, index) =>{
            groups.push({...info, ...rows[index]})
          })
          console.log('데이터완성', groups);
          res.send(groups)
        }
      })
    }
  })
})

io.on("connection", function (socket){

  connection.query(
    'insert into message_table (room_id,user_key,message_body) values (?,?,?)',
    [req.body.roomid, req.body.userkey, 'delcode5010'],
    function (err, rows, field) {
      if (err) {
        console.log(err);
      } else {
        console.log('성공');
        res.send();
      }
    },
  );
});

io.on('connection', function (socket) {});

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
