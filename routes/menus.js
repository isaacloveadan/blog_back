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

// 查询菜单列表
router.get('/getMenus', function(req, res, next) {
  connection.query('SELECT * FROM menus', function (err, result, fields) { 
    if (err) {
      res.status(500);
      res.send(err);
    }
    const data = formatResult(result);
    res.status(200);
    res.json({result: true, message: data})
  })
})

module.exports = router;