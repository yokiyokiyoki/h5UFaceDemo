var express = require("express");
var app = express();

var AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
var APP_ID = "15433482";
var API_KEY = "QarZMYI7ZCrH31GAnO5zKWZQ";
var SECRET_KEY = "b5U98hpjpmfHxWVOQ1fI68IP8Wo07AVN";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
