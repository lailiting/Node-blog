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

router.get("/",isLogin, async (req, res) => {
    console.log(req.query)
    const page = parseInt(req.query.page)
    const limitnum = parseInt(req.query.limitnum)

    const liststr = "select * from articlelist limit ?,?"
    let result
    try{
        result = await sqlQuery(liststr, [(page-1)*limitnum, page*limitnum])
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(result)
    res.send({
        code : 200,
        data : result
    })

})

module.exports = router