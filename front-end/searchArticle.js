//search查询

const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签

router.post("/", async (req, res) => {
    let name = req.body.name
    if(name == undefined){
        res.send({
            code : 400,
            errmsg : "参数不全"
        })
    }
    const sqlstr = "SELECT id,title from articlelist WHERE title like '%' ? '%'"
    let result
    try{
        result = await sqlQuery(sqlstr,[name])
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