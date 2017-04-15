const express = require('express');
const db = require('../db');
const moment = require('moment');
const router = express.Router();

router.get('/', function (req, res, next) {
  //Get Student Info Summary data
  db.query(
    'SELECT ent_year, count(sid) as count FROM dbproject.student GROUP BY ent_year;',
    (err, rows,fileds) => {
      if (err) {
        return next(err);
      }
      console.log(rows);
      let studentNum = [];
      let m
      for(let i=0;i<rows.length;i++){
        studentNum.push(rows[i].count);
      }
      console.log(studentNum);
      res.render('manager_board', {
        data: rows,
        studentNum : studentNum,
        serverTime: moment().format('LLLL')
      });
    }
  );

});

module.exports = router;