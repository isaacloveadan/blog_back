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
  password: '',
  database: 'blog',
  port: 3306,
})
// 数据库连接
connection.connect();

// 查询文章列表
router.get('/list', function(req, res, next) {
  if (JSON.stringify(req.query) === '{}') {
    connection.query('SELECT * FROM docs', function(err, result, fields) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      const data = formatResult(result);
      _.forEach(data, (item, index) => {
        const tmp = fs.readFileSync(item.contentUrl, 'utf-8');
        data[index].content = tmp;
        delete data[index].contentUrl;
      })
      res.status(200);
      res.json({result: true, message: data})
    })
  } else {
    const key = Object.keys(req.query)[0];
    const value = req.query[key];
    console.log(key);
    console.log(value);
    connection.query(`SELECT * FROM docs WHERE ${key} LIKE '%${value}%'`, function(err, result, fields) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      res.status(200);
      res.json({result: true, message: formatResult(result)})
    })
    
  }
})

// 新增文章
router.post('/newList', function (req, res, next) { 
  const randomTxt = Math.random().toString(36).substr(2);
  const content = req.body.content;
  const contentUrl = `/users/zhenghaotian/documents/blogDocs/${randomTxt}.txt`;
  fs.writeFile(contentUrl, content, function(err) {
    if (err) {
      res.status(500);
      res.send(err);
    }
    connection.query('INSERT INTO docs (title, description, contentUrl, user) VALUES (?, ?, ?, ?)', [
      req.body.title,
      req.body.description,
      contentUrl,
      req.body.user,
    ], function(err, result, fields) {
      if (err) {
        res.status(500);
        res.send(err);
      }
      res.status(200);
      res.json({result: true, message: '发布成功'})
    })
  })
})

module.exports = router;