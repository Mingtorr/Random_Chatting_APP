const express = require('express');
const app = express();
const port = 3006;
const mysql = require('mysql');

var http = require('http').createServer(app);

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb',
});
connection.connect();

var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

var interval = setInterval(test, 1000 * 60);

function delete_room() {
  connection.query(
    'select p.room_id from participant p LEFT OUTER JOIN message_table m on p.room_id=m.room_id  where p.shownickname =1  and (m.message_time + INTERVAL 1 DAY)  <NOW();',
    function (err, rows, fields) {
      if (err) console.log(err);
      else if (rows === undefined || rows[0] === undefined) return;
      else {
        rows.map((row, index) => {
          connection.query(
            'delete from message_table where room_id=(?);',
            [row.room_id],
            function (err, rows, fields) {
              if (err) console.log(err);
              connection.query(
                'delete from participant where room_id=(?);',
                [row.room_id],
                function (err, rows, fields) {
                  if (err) console.log(err);
                  connection.query(
                    'delete from messageroom_table where room_id=(?);',
                    [row.room_id],
                    function (err, rows, fields) {
                      if (err) console.log(err);
                      else {
                        // console.log('24시간 이상 연락 없는 방 삭제처리 완료');
                      }
                    },
                  );
                },
              );
            },
          );
        });
      }
    },
  );
}
function heat_plus() {
  connection.query('select user_key from user_table;', function (
    err,
    rows,
    fields,
  ) {
    rows.map((row, index) => {
      connection.query(
        'UPDATE user_table SET user_heart = 5 WHERE user_key = (?)',
        [row.user_key],
        function (err, rows, fields) {
          if (err) console.log(err);
        },
      );
    });
  });
}

function test() {
  var date = moment().format('hh');
  // console.log(date);
  if (date.tostring() === 00) {
    heat_plus();
  }
  clearInterval(interval);
  delete_room();
  interval = setInterval(test, 1000 * 60);
  interval;
}

http.listen(port, () => {
  interval;
  console.log(`Example app listening at http://localhost:${port}`);
});
