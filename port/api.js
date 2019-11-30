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


// users
router.post('/users/page', function (req, res) {
    var userPage = Number(req.body.page);
    var userRows = Number(req.body.rows);
    var start = (userPage - 1) * userRows;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('select * from user limit ?,?',[start, userRows],function(err,result,fileds){
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


// 【-------  users 新增  ------- 】   
router.post('/users/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var userName = req.body.userName;
    var sex = req.body.sex;
    var age = req.body.age;
    var phone = req.body.phone;
    var address = req.body.address;
    var account = req.body.account;
    var paddword = req.body.paddword;
    var remark = req.body.remark;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    console.log(111,req)
    myQuery('insert into user (userName,sex,age,phone,address,account,paddword,remark) value (?,?,?,?,?,?,?,?)',[userName,sex,age,phone,address,account,paddword,remark],function(err,result,fileds){
        console.log(222,result)
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/users/updata', function (req, res) {
    var userName = req.body.userName;
    var sex = req.body.sex;
    var age = req.body.age;
    var phone = req.body.phone;
    var address = req.body.address;
    var account = req.body.account;
    var paddword = req.body.paddword;
    var remark = req.body.remark;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update user set userName=?, sex=?, age=? phone=?, address=?, account=? , paddword=? where id=?;",[userName,sex,age,phone,address,account,paddword,remark,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/users/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from user where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})




// goods
router.post('/goods/page', function (req, res) {
    var userPage = Number(req.body.page);
    var userRows = Number(req.body.rows);
    var start = (userPage - 1) * userRows;
    // console.log(555,userPage,userRows,start)
    // console.log('进入',req)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
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
    // console.log(req)
    // console.log('LLLL')
    var userPage = Number(req.body.page);
    var userRows = Number(req.body.rows);
    var start = (userPage - 1) * userRows;
    // console.log(5551,userPage,userRows,start)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    // console.log(111,req)
    // console.log(typeof userRows)
    myQuery('select * from color limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log(666,err)
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
        // console.log('111',result)
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

// memory类型
router.post('/memory/page', function (req, res) {
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
    myQuery('select * from memory limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log('111',result)
        myQuery('select count(*) count from memory', function (e, countRes, fie) {
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

// goodstype类型
router.post('/goodstype/page', function (req, res) {
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
    myQuery('select * from goodstype limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log('111',result)
        myQuery('select count(*) count from goodstype', function (e, countRes, fie) {
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



// goodstype类型
router.post('/goods_color_memory/page', function (req, res) {
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
    myQuery('select * from goods_color_memory limit ?,?',[start, userRows],function(err,result,fileds){
        // console.log('111',result)
        myQuery('select count(*) count from goods_color_memory', function (e, countRes, fie) {
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





// 【-------  goods 新增  ------- 】   
router.post('/goods/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var goodsName = req.body.name;
    var goodsType = req.body.type;
    var goodsPrice = req.body.price;
    var goodsSaleInfo = req.body.saleInfo;
    var goodsIsNew = req.body.isNew;
    var goodsIsSale = req.body.isSale;
    var goodsMid = req.body.mid;
    // console.log('新增',goodsName,goodsType,goodsPrice,goodsSaleInfo,goodsIsNew,goodsIsSale)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into goods (name,type,price,saleInfo,isNew,isSale,mid) value (?,?,?,?,?,?,?)',[goodsName,goodsType,goodsPrice,goodsSaleInfo,goodsIsNew,goodsIsSale,goodsMid],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/goods/updata', function (req, res) {
    var goodsName = req.body.name;
    var goodsType = req.body.type;
    var goodsPrice = req.body.price;
    var goodsSaleInfo = req.body.saleInfo;
    var goodsIsNew = req.body.isNew;
    var goodsIsSale = req.body.isSale;
    var goodsMid = req.body.mid;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update goods set name=?, type=?, price=?, saleInfo=?, isNew=?, isSale=? mid=? where id=?;",[goodsName,goodsType,goodsPrice,goodsSaleInfo,goodsIsNew,goodsIsSale,goodsMid,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/goods/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from goods where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})







// 【-------  color 新增  ------- 】   
router.post('/color/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var colorName = req.body.colorName;
    var colorValue = req.body.colorValue;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into color (colorName,colorValue) value (?,?)',[colorName,colorValue],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/color/updata', function (req, res) {
    var colorName = req.body.colorName;
    var colorValue = req.body.colorValue;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update color set colorName=?, colorValue=? where id=?;",[colorName,colorValue,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/color/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from color where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})





// 【-------  type 新增  ------- 】   
router.post('/type/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var typeName = req.body.typeName;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into type (typeName) value (?)',[typeName],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/type/updata', function (req, res) {
    var typeName = req.body.typeName;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update type set typeName=? where id=?;",[typeName,id],function(err,result,fileds){
        // console.log(111,result)
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/type/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from type where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})





// 【-------  memory 新增  ------- 】   
router.post('/memory/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var memoryName = req.body.name;
    var memoryRemark = req.body.remark;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into memory (name,remark) value (?,?)',[memoryName,memoryRemark],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/memory/updata', function (req, res) {
    var name = req.body.name;
    var remark = req.body.remark;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update memory set name=?, remark=? where id=?;",[name,remark,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result; 
        res.json(data)
    })
})


// 删除信息
router.post('/memory/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from memory where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})




// 【-------  goodstype 新增  ------- 】   
router.post('/goodstype/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var typeName = req.body.typeName;
    var remark = req.body.remark;
    var typeImg = req.body.typeImg;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into goodstype (typeName,remark,typeImg) value (?,?,?)',[typeName,remark,typeImg],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/goodstype/updata', function (req, res) {
    var typeName = req.body.typeName;
    var remark = req.body.remark; 
    var typeImg = req.body.typeImg; 
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update goodstype set typeName=?, remark=?, typeImg=? where id=?;",[typeName,remark,typeImg,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/goodstype/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from goodstype where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})




// 【-------  goods_color_memory 新增  ------- 】   
router.post('/goods_color_memory/add', function (req, res) {
    // 接创建对话框里的input的name对应值
    var gID = req.body.gID;
    var cID = req.body.cID;
    var mID = req.body.mID;
    var num = req.body.num;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery('insert into goods_color_memory (gID,cID,mID,num) value (?,?,?,?)',[gID,cID,mID,num],function(err,result,fileds){
        data.message='新增成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 更新修改
router.post('/goods_color_memory/updata', function (req, res) {
    var gID = req.body.gID;
    var cID = req.body.cID;
    var mID = req.body.mID;
    var num = req.body.num;
    var id=req.body.id;
    console.log('修改',id)
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("update goods_color_memory set gID=?, cID=?, mID=?, num=? where id=?;",[gID,cID,mID,num,id],function(err,result,fileds){
        data.message='修改成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})


// 删除信息
router.post('/goods_color_memory/delete', function (req, res) {
    var id=req.body.id;
    var data = {
        message: '',
        code: 1001,
        data: ''
    }
    myQuery("delete from goods_color_memory where id=?;",[id],function(err,result,fileds){
        data.message='删除成功';
        data.code=1001;
        data.data=result;
        res.json(data)
    })
})



// 【-------  user 用户管理  ------- 】  



module.exports=router;