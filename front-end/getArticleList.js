//获取所有文章，没有登录验证
//分页查询

const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签

router.post("/", async (req, res) => {
    const page = parseInt(req.body.page)
    const limitnum = parseInt(req.body.limitnum)
    const lensqlstr = "SELECT * FROM articlelist"
    let allresult
    const sqlstr = "select * from articlelist limit ?,?"
    let result
    try{
        result = await sqlQuery(sqlstr, [(page-1)*limitnum, page*limitnum])
        allresult = await sqlQuery(lensqlstr)
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(allresult.length)
    res.send({
        code : 200,
        errmsg : "获取成功",
        data : result,
        total : allresult.length
    })

})

module.exports = router