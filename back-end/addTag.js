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
    
    const tag = req.body.tag
    if(tag == undefined){
        res.send({
            code : 400,
            errmsg : "参数不全"
        })
    }

    const selectsqlstr = "select * from tags where name=?"
    let selectresult
    try{
        selectresult = await sqlQuery(selectsqlstr, [tag])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    if(selectresult.length >0){
        res.send({
            code : 400,
            errmsg : "该标签已存在"
        })
    }


    const sqlstr = "insert into tags (name) values (?)"
    let result
    try{
        result = await sqlQuery(sqlstr, [tag])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(result)
    res.send({
        code : 200,
        errmsg : "标签添加成功"
    })

})

module.exports = router