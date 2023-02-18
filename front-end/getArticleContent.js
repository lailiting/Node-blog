//通过文章id获取文章内容
//连表查询

const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签

router.get("/article/content/:id", async (req, res) => {
    const id = req.params.id
    const sqlstr = "SELECT * FROM articlelist RIGHT JOIN articlecontent ON articlecontent.id = articlelist.id where articlecontent.id = ?"
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
    if(result.length == 0){
        res.send({
            code : 200,
            errmsg : "获取成功",
            data : null
        })
    }else{
        res.send({
            code : 200,
            errmsg : "获取成功",
            data : result[0]
        })
    }

})

module.exports = router