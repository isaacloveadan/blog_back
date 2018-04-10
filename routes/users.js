var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// 数据库配置
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'zht921205',
  database: 'world',
  port: 3306,
})
// 数据库连接
connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * FROM city', function(err, result, fields) {
    if (err) {
      throw error;
    }
    console.log(result);
  })
  res.send('respond with a resource');
});
router.get('/abc', function(req, res, next) {
  res.send('123');
})

module.exports = router;
