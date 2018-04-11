var express = require('express');
var mysql = require('mysql');
var router = express.Router();

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
router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  connection.query('SELECT password FROM users WHERE username = ?', [username], function(err, result, fields) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    const string = JSON.stringify(result);
    const data = JSON.parse(string);
    if (data[0].password.toString() === password.toString()) {
      res.status(200);
      res.send({result: true, message: '登录成功'});
    } else {
      res.status(400);
      res.send({result: false, message: '密码错误'})
    }
  })
});

module.exports = router;
