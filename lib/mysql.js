var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'wenhao',
    database: 'node',
    connectionLimit: '10'
});
// var fn = function(err, result, fileds){
//     console.log(err)
// }
 var myQuery = function(sql,params, callback){
    // pool连接词
    pool.getConnection(function(err, conn){
        if(callback){
            conn.query(sql, params, function(err, result, fileds){
                conn.release();
                callback(err, result, fileds);
            })
        }else{
            conn.query(sql,  function(err, result, fileds){
                conn.release();
                params(err, result, fileds);
            })
        }
    });
}
exports.myQuery = myQuery;