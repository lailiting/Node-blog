const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")

function isLogin(req, res, next){
    if(req.session.username != undefined){
        next()
    }else{
        res.send({
            code : 405,
            errmsg : "未登录，没有权限"
        })
    }
}

router.post("/",isLogin, async (req, res) => {
    
    const catalog = req.body.catalog
    if(catalog == undefined){
        res.send({
            code : 400,
            errmsg : "参数不全"
        })
    }
    const selectsqlstr = "select * from catalog where name=?"
    let selectresult
    try{
        selectresult = await sqlQuery(selectsqlstr, [catalog])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    if(selectresult.length >0){
        res.send({
            code : 400,
            errmsg : "该分类已存在"
        })
    }


    const sqlstr = "insert into catalog (name) values (?)"
    let result
    try{
        result = await sqlQuery(sqlstr, [catalog])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(result)
    res.send({
        code : 200,
        errmsg : "分类添加成功"
    })

})

module.exports = router