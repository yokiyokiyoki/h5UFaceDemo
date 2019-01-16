var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/", function(req, res, next) {
  res.send("UFace post ok");
});

var AipFace = require("baidu-aip-sdk").face;

var APP_ID = "15433482";
var API_KEY = "QarZMYI7ZCrH31GAnO5zKWZQ";
var SECRET_KEY = "b5U98hpjpmfHxWVOQ1fI68IP8Wo07AVN";
//这三个key记得替换为你申请的appid

var client = new AipFace(APP_ID, API_KEY, SECRET_KEY);

/*var fs = require('fs');
var image = fs.readFileSync('./public/images/face/face.png');
var base64Img = new Buffer(image).toString('base64');
client.detect(base64Img).then(function(result) {  
     console.log(JSON.stringify(result)); 
});*/

var multiparty = require("multiparty");
var util = require("util");
var fs = require("fs");

router.post("/file/uploading", function(req, res, next) {
  var form = new multiparty.Form({
    uploadDir: "./public/files/"
  });

  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log("parse error: " + err);
    } else {
      console.log("parse files: " + filesTmp);

      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;

      var image = fs.readFileSync(uploadedPath);
      var base64Img = new Buffer(image).toString("base64");

      client.detect(base64Img).then(function(result) {
        Object.assign(result, {
          imgSrc: uploadedPath.replace("public", "").replace(/\\/g, "/")
        });
        res.send(JSON.stringify(result));
      });
    }
  });
});

module.exports = router;
