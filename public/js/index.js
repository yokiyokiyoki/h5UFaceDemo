function uploadImg() {
  var formData = new FormData();
  formData.append("file", $("#upload")[0].files[0]);
  $.ajax({
    type: "POST",
    url: "./file/uploading",
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      var json = JSON.parse(res);
      if (json.result && json.result.face_num) {
        //从后端获取到人脸检测到结果后，调用createFace函数，进行图片合成
        createFace(json);
      } else {
        alert("检测不到人脸，请上传符合规格的头像！");
      }
    }
  });
}

function createFace(data) {
  var jzimg = $("#jz")[0];
  var img = $("#target")[0];
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext("2d");
  var location = data.result.face_list[0];
  var sx = location.location.left,
    sy = location.location.top,
    swidth = location.location.width,
    sheight = location.location.height;
  img.src = data.imgSrc;
  img.onload = function() {
    //异步
    ctx.drawImage(jzimg, 0, 0);
    ctx.drawImage(img, sx, sy, swidth, sheight, 210, 68, 70, 48);
  };
}
