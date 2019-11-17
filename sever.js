var express=require('express');
var app=express();
var bodyParser=require('body-parser');


// 加载中间件
app.use(bodyParser.urlencoded({
    extended: true
}));

// use中间件拦截/api转移
app.use('/api',require('./port/api'));
// app.use('/apc',require('./port/index'));



var server=app.listen(8081,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
