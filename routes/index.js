var express = require("express");
const axios = require("axios");
var router = express.Router();
const qs = require("qs");
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

//face++ 的授权
var FAPI_KEY = "T_ohwyZ4qPexYQGOM6Qpp3-8tRxums_U";
var FSECRET_KEY = "hlXd8o2G_e_Q6_1FlXvBt09dohPQ9zg-";

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

      client.detect(base64Img, "BASE64").then(function(result) {
        Object.assign(result, {
          imgSrc: uploadedPath.replace("public", "").replace(/\\/g, "/")
        });
        res.send(JSON.stringify(result));
      });
    }
  });
});

router.post("/file/merge/uploading", function(req, res, next) {
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

      var imageFace = fs.readFileSync(uploadedPath);
      var base64ImgFace = new Buffer(imageFace).toString("base64");

      var imageTpl = fs.readFileSync("./public/images/face/timg.jpg");
      var base64ImgTpl = new Buffer(imageTpl).toString("base64");

      axios({
        method: "post",
        url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
        data: qs.stringify({
          api_key: FAPI_KEY,
          api_secret: FSECRET_KEY,
          template_base64: base64ImgTpl,
          merge_base64: base64ImgFace
        })
      })
        .then(data => {
          console.log(data);
          res.send(data.data);
        })
        .catch(e => {
          console.log(e.response.data);
        });
    }
  });
});

//face++本地测试
// var imageFace = fs.readFileSync("./public/images/face/1.jpg");
// var base64ImgFace = new Buffer(imageFace).toString("base64");

// var imageTpl = fs.readFileSync("./public/images/face/timg.jpg");
// var base64ImgTpl = new Buffer(imageTpl).toString("base64");

// axios({
//   method: "post",
//   url: "https://api-cn.faceplusplus.com/imagepp/v1/mergeface",
//   data: qs.stringify({
//     api_key: FAPI_KEY,
//     api_secret: FSECRET_KEY,
//     template_base64: base64ImgTpl,
//     merge_base64: base64ImgFace
//   })
// })
//   .then(data => {
//     console.log(data);
//     var imgData = data.data.result;
//     //过滤data:URL
//     var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
//     var dataBuffer = new Buffer(base64Data, "base64");
//     fs.writeFile("image.png", dataBuffer, function(err) {
//       if (err) {
//         console.log('错误')
//       } else {
//         console.log('成功')
//       }
//     });
//   })
//   .catch(e => {
//     console.log(e.response.data);
//   });
https: module.exports = router;
