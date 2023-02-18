const mysql = require('mysql')

const mysqlOptions = {
    host : "localhost",
    port : "3307",
    user:"root",
    password : "nzhlove0711",
    database : "newsql"

}

const mysqlConnect = mysql.createConnection(mysqlOptions)

function sqlQuery(strsql, arr){
    console.log(arr)
    return new Promise((resolve, reject) => {
        mysqlConnect.query(strsql, arr, (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

module.exports = sqlQuery;