---
title: node-backend-react-front-server
date: 2017-12-17 11:20:17
tags:
---

# 服务器端代码详解
## 解析server.js文件

在package.json里面的启动语句是
```
nodemon --harmony  server.js
```
nodeman是用于生产环境的能够实现自动重启的工具，可以参考[这篇文章](https://strongloop.com/strongblog/comparison-tools-to-automate-restarting-node-js-server-after-code-changes-forever-nodemon-nodesupervisor-nodedev/)
