var express=require('express');
var router=express.Router();
var myQuery=require('../lib/mysql').myQuery;

// ----———————— 登 录 ——————————-----
// post请求用户输入账号密码不会在地址后附加
router.post('/L1login',function(req,res){
    // console.log(req)
    var userName = req.body.Username;
    var password = req.body.Password;
    var data={
        message: '',
        code: 1001,
        data: ''
    }
    if(!userName || !password){
        // console.log(222)
        data.message = '用户名或密码不能为空';
        data.code = 1002;
        res.json(data)
    }else{
        myQuery('select * from user where account=?', [userName], function (err, resl) {
            // resl返回的是一个数组，当数据库里查到有数据时，resl.length长度则不是0
            // console.log(3);
            if (err) {
                // console.log(err)
            } else {
                // console.log(resl)
                if (resl.length === 0) {
                    data.message = '账号不存在';
                    data.code = 1002;
                    res.json(data)
                } else {
                    if (password === resl[0].paddword) {
                        data.message = '登录成功';
                        data.code = 1001;
                        // res.cookie('userInfo',password,{maxAge:1000*5})
                        // res.cookie('userInfo',password)
                        res.json(data)
                    } else {
                        data.message = '密码错误';
                        data.code = 1002;
                        res.json(data)
                    }

                }
            }

        })
    }
})

// ----———————— 注 册 ——————————-----
// post请求用户输入账号密码不会在地址后附加
router.post('/R1register', function (req, res) {
    var userName = req.body.reUsername;
    var password = req.body.rePassword;
    var passwords = req.body.rePasswords;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }

    if (!userName || !password || !passwords) {
        data.message = '用户名或密码不能为空';
        data.code = 1002;
        res.json(data)
    } else {
        var sle = "select * from user where account='" + userName + "'";
        myQuery(sle, function (err, resls) {
            if (resls.length !==0) {
                console.log(resls)
                data.message = '账号已存在';
                data.code = 1002;
                res.json(data)
            } else {
                myQuery('insert into user (account,paddword) values (?,?)', [userName, password], function (err, resl) {
                    data.message = '注册成功';
                    data.code = 1001;
                    res.json(data)
                })
            }
        })
    }
})


// goods
router.post('/goods/page', function (req, res) {
    var userPage = Number(req.body.page);
    var userRows = Number(req.body.rows);
    var start = (userPage - 1) * userRows;
    // console.log(555,userPage,userRows,start)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    // console.log(111,req)
    // console.log(typeof userRows)
    myQuery('select * from goods limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log(000,result)
        myQuery('select count(*) count from goods', function (e, countRes, fie) {
            data.message = '操作成功';
            data.code = 1001;
            data.data = {
                rows: result,
                total: countRes[0].count
            };
            res.json(data)
        })
    })
});

// goods颜色
router.post('/color/page', function (req, res) {
    console.log(req)
    var userPage = req.body.page;
    var userRows = req.body.rows;
    var start = (userPage - 1) * userRows;
    console.log(5551,userPage,userRows,start)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    // console.log(111,req)
    // console.log(typeof userRows)
    myQuery('select * from color limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log(777,result)
        myQuery('select count(*) count from color', function (e, countRes, fie) {
            data.message = '操作成功';
            data.code = 1001;
            data.data = {
                rows: result,
                total: countRes[0].count
            };
            res.json(data)
        })
    })
});

// goods类型
router.post('/type/page', function (req, res) {
    var userPage = Number(req.body.page);
    var userRows = Number(req.body.rows);
    var start = (userPage - 1) * userRows;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    // console.log(111,req)
    // console.log(typeof userRows)
    myQuery('select * from type limit ?,?',[start, userRows],function(err,result,fileds){
        console.log('111',result)
        myQuery('select count(*) count from type', function (e, countRes, fie) {
            data.message = '操作成功';
            data.code = 1001;
            data.data = {
                rows: result,
                total: countRes[0].count
            };
            res.json(data)
        })
    })
});







module.exports=router;