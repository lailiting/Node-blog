const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
const jiami = require("../utils/jiami")

async function isuser(req, res, next){
    const phone = req.body.phone
    const namesqlstr = "select * from user where mail = ?"
    let resultname
    try{
       resultname = await sqlQuery(namesqlstr, [phone])
    }catch(err){
        console.log(err)
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    
    if(resultname.length != 0){
        next()
    }else{
        res.send({
            code : 400,
            errmsg : "用户不存在"
        })
    }
}

router.post("/",isuser, async (req, res) => {
    const phone = req.body.phone
    if(phone == undefined){
        res.send({
            code :400,
            errmsg : "参数不全"
        })
    }
    const password = jiami(req.body.password)
    const usersqlstr = "select * from user where mail = ? and password = ?"
    let resultuser
    try{
       resultuser = await sqlQuery(usersqlstr, [phone,password])
    }catch(err){
        console.log(err)
        res.send({
            code : 500,
            errmsg : "系统错误"
        })
    }
    
    if(resultuser.length != 0){
        req.session.username = phone
        res.send({
            code : 200,
            errmsg : "登录成功"
        })
    }else{
        res.send({
            code : 400,
            errmsg : "密码错误"
        })
    }
})

module.exports = router;