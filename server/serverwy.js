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
  password: 'snsk3779@',
  database: 'mydb',
});

connection.connect();

app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use(bodyparser.json());

app.post('/GetMessageRoom', (req, res) => {
  const userKey = req.body.userKey;
  console.log('userkey: ', userKey);

  connection.query(
    `SELECT part.count, part.room_id, part.user_key,part.shownickname, info.user_nickname, info.user_sex 
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
        if (rows[0] === undefined){

        }else{
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
                  console.log('asdfasdafsd', mess);
                  res.send(mess);
                },
              );
            }
          },
        );
        }
        
      }
    },
  );
});
app.post('/getshownickname', (req, res) => {
  connection.query(
    'select * from participant where room_id = ? and user_key = ?',
    [req.body.room_id, req.body.user_key],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      }else{
        if(rows[0] != undefined){
          console.log("DLDDLDDLDLD"+JSON.stringify(rows[0]));
          res.send(rows[0]);
        }
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

app.post('/Get_Group', (req, res) =>{
  console.log('그룹');

  connection.query(
  `SELECT Gpart.group_key, Gpart.user_key, Gpart.count, Gmess.group_title, Gmess.group_date 
  FROM group_participant as Gpart join group_table as Gmess on Gpart.group_key = Gmess.group_key
  WHERE Gpart.group_key in (SELECT Gpart.group_key FROM group_participant as Gpart where user_key =? and Gpart.room_del= 0) and Gpart.room_del= 0 `,
  [req.body.userKey], function(err, rows, fields){
    if(err){
      console.log(err);
    }else{
      console.log('그룹', rows);
      if(rows[0] === undefined){

      }else{
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
        console.log('그룹키: ', group_key);
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
            // console.log('데이터완성', groups);
            res.send(groups)
          }
        })
      }
      
    }
  })
})

app.post('/DelGroupRoom', (req, res)=>{
  console.log('그룹삭제', req.body);
  connection.query(`
    UPDATE group_participant SET room_del = 1 WHERE group_key = ? and user_key = ?`,
    [req.body.group_key, req.body.userkey],
    function (err, rows, fields){
      if(err){
        console.log('err', err);
      }
    })
})

io.on("connection", function (socket){

});


http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
