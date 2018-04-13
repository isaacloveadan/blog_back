var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var { formatResult } = require('../public/javascripts/formatResult');

// 数据库配置
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'zht921205',
  database: 'blog',
  port: 3306,
})
// 数据库连接
connection.connect();

/* GET users listing. */
// 登录
router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  connection.query('SELECT password FROM users WHERE username = ?', [username], function(err, result, fields) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    const data = formatResult(result);
    if (data.length > 0) {
      if (data[0].password.toString() === password.toString()) {
        connection.query('SELECT id FROM users WHERE username = ?', [username], function(err2, result2, fields2) {
          if (err2) {
            res.status(500);
            res.send(err2);
          }
          const data2 = formatResult(result2);
          res.status(200);
          res.send({result: true, message: '登录成功', id: data2[0].id});
        })
      } else {
        res.status(400);
        res.send({result: false, message: '密码错误'})
      }
    } else {
      res.status(400);
      res.send({result: false, message: '没有该用户'})
    }
  })
});

// 注册
router.post('/register', function (req, res, next) { 
  const username = req.body.username;
  const password = req.body.password;
  connection.query('SELECT username FROM users WHERE username = ?', [username], function(err, result, fields) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    const data = formatResult(result);
    if (data.length > 0) {
      res.status(400);
      res.json({result: false, message: '已存在该用户'});
    } else {
      connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err, result, fields) {
        if (err) {
          res.status(500);
          res.send(err);
        }
        res.status(200);
        res.json({result: true, message: '创建成功'});
      })
    }
  })
})

// 通过用户id查找用户
router.get('/getUser', function(req, res, next) {
  const id = req.query.id;
  connection.query('SELECT username FROM users WHERE id = ?', [id], function (err, result, fields) { 
    const data = formatResult(result);
    if (err) {
      res.status(500);
      res.send(err);
    } else {
      res.status(200);
      res.json({result: true, message: {
        id: id,
        username: data[0].username,
      }});
    }
  })
})

module.exports = router;
