var express=require('express');
var router=express.Router();
var myQuery=require('../lib/mysql').myQuery;

// ----———————— 登 录 ——————————-----
// post请求用户输入账号密码不会在地址后附加
router.post('/',function(req,res){
})


module.exports=router;