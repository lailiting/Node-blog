const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
const jiami = require("../utils/jiami")

router.post("/", async (req,res) => {
    // console.log(req)
    // console.log(req.body)
    let mail = req.body.mail
    let name = req.body.name
    let password = jiami(req.body.password)
    if(mail == undefined || name == undefined || password == undefined){
        res.send({
            code : 400,
            errmsg : "参数不全"
        })
    }

    let mailsqlstr = "select * from user where mail = ?"
    let result = await sqlQuery(mailsqlstr, [mail])
    console.log(result)
    if(result.length > 0){
        res.send({
            code : 400,
            errmsg : "用户已存在"
        })
    }else{
        let insertstr = "insert into user (mail, name, password) values (?,?,?)"
        let insertresult = await sqlQuery(insertstr, [mail, name, password])
        console.log(insertresult)
        res.send({
            code : 200,
            errmsg : "注册成功"
        })
    }
})

module.exports = router