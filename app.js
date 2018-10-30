var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

// const proxyRes=function(proxyRes, req, res){
//   // req.headers["origin"] ||
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Content-Type", "application/json;charset=utf-8");
// }

app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});

app.use('/it120', proxy({
    target: 'https://api.it120.cc/mforz/',
    changeOrigin: true,
    pathRewrite:{
      '^/it120':'/'
    }
}));

app.use('/qqmusic', proxy({
    target: 'https://u.y.qq.com/',
    changeOrigin: true,
    pathRewrite:{
      '^/qqmusic':'/'
    }
}));

app.use('/weather', proxy({
    target: 'https://interface.sina.cn/dfz/outside/',
    changeOrigin: true,
    pathRewrite:{
      '^/weather':'/'
    }
}));
app.use(express.static("dist"));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`);
});

module.exports = app;