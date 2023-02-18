//获取文章的时间点

const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签

router.get("/", async (req, res) => {
    const sqlstr = "select id, title, time from articlelist"
    let result
    try{
        result = await sqlQuery(sqlstr)
    }catch(err){
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    console.log(result)
    res.send({
        code : 200,
        errmsg : "获取成功",
        data : result
    })

})

module.exports = router