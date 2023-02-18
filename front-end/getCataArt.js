const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签


router.get("/catalog/article/:id", async (req, res) => {
    const id = req.params.id
    //like匹配方式的问题 要把?隔开
    const sqlstr = "select * from articlelist where catalog=?"
    let result
    try{
        result = await sqlQuery(sqlstr, [id])
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