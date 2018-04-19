var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var _ = require('lodash');
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

// 查询文章列表
router.get('/list', function(req, res, next) {
  connection.query('SELECT * FROM docs', function(err, result, fields) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    const data = formatResult(result);
    _.forEach(data, (item, index) => {
      const tmp = fs.readFileSync(item.contentUrl, 'utf-8');
      console.log(tmp)
      data[index].content = tmp;
      delete data[index].contentUrl;
    })
    res.status(200);
    res.json({result: true, message: data})
  })
})
module.exports = router;