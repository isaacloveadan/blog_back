// 格式化数据库返回数据
module.exports = {
  formatResult: function(result) {
    const string = JSON.stringify(result);
    const data = JSON.parse(string);
    return data;
  }
} 