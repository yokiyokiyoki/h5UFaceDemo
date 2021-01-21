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



/*face++ 的授权*/
let FAPI_KEY = "T_ohwyZ4qPexYQGOM6Qpp3-8tRxums_U";
let FSECRET_KEY = "hlXd8o2G_e_Q6_1FlXvBt09dohPQ9zg-";

let multiparty = require("multiparty");

let fs = require("fs");


router.post("/file/merge/uploading", function(req, res, next) {
    
  var form = new multiparty.Form({
      /* 上传的文件存放 */
    uploadDir: "./public/files/"
  });
    /* multiparty解析form文件*/
  form.parse(req, function(err, fields, files) {
    var filesTmp = JSON.stringify(files, null, 2);

    if (err) {
      console.log("解析错误" + err);
    } else {
      console.log( filesTmp);

      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;

        /* 上传的文件 */
      var imageFace = fs.readFileSync(uploadedPath);
      var base64ImgFace = Buffer.from(imageFace).toString("base64");
        /* 读取模板图，编码成base64，模板要求base64 */
        //TODO:以后自己前端上传模板图
      var imageTpl = fs.readFileSync("./public/images/face/huge.png");
      var base64ImgTpl = Buffer.from(imageTpl).toString("base64");

        /* 请求face++接口 */
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


https: module.exports = router;
