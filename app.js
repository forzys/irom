var express = require('express');
var proxy = require('http-proxy-middleware');
var app = express();

const proxyRes=function(proxyRes, req, res){
  // req.headers["origin"] ||
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
}


app.use('/it120', proxy({
    target: 'https://api.it120.cc/mforz/',
    changeOrigin: true,
    onProxyRes: proxyRes,
    pathRewrite:{
      '^/it120':'/'
    }
}));

app.use('/qqmusic', proxy({
    target: 'https://u.y.qq.com/',
    changeOrigin: true,
    onProxyRes: proxyRes,
    pathRewrite:{
      '^/qqmusic':'/'
    }
}));

app.use('/weather', proxy({
    target: 'https://interface.sina.cn/dfz/outside/',
    changeOrigin: true,
    onProxyRes: proxyRes,
    pathRewrite:{
      '^/weather':'/'
    }
}));


app.use(express.static("dist"));
app.listen(3000);
console.log('Proxy server is listen at port 3000...');
