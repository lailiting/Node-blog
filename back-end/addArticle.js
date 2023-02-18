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
    const title = req.body.title
    const time = req.body.time
    const tag = req.body.tag
    const catalog = req.body.catalog
    const content = req.body.content
    if(title == undefined || time == undefined || catalog == undefined || tag == undefined || content == undefined){
        res.send({
            code : 400,
            errmsg : "参数不全"
        })
    }
    const sqlstr = "insert into articlelist (title, time, catalog, tag) values (?,?,?,?)"
    let result
    try{
        result = await sqlQuery(sqlstr, [title, time, catalog, tag])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(result)
    console.log(result.insertId)
    let insertId = result.insertId
    const insertsqlstr = "insert into articlecontent (id, content) values (?, ?)"
    let insertContent
    try{
      insertContent = sqlQuery(insertsqlstr, [insertId,content])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(insertContent)
    res.send({
        code : 200,
        errmsg : "文章添加成功"
    })

})

module.exports = router