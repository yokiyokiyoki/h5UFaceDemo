/** 
 * 上传文件接口
*/
function mergeImg() {
  var formData = new FormData();
  formData.append("file", $("#upload")[0].files[0]);
  $.ajax({
    type: "POST",
    url: "/file/merge/uploading",
    data: formData,
    processData: false,
    contentType: false,
    success: function(res) {
      console.log(res);
      $("#target")[0].src = "data:image/png;base64," + res.result;
      $("#target").show();
    }
  });
}
