# 简单介绍

- 基于百度 ai 人脸识别接口，贴脸简单 demo

# 使用

- yarn&&yarn start 监听 3000 端口
- 打开浏览器输入：localhost：3000

# 说明

- files 文件用来存放上传文件
- 原理：前端上传包含有人脸图片给后端，后端再发起请求给百度 ai 接口，返回人脸的大致位置数据，前端用 canvas 拼接去另外一个图片
