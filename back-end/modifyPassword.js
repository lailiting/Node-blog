const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
const jiami = require("../utils/jiami")

function isLogin(req, res, next) {
    if (req.session.username != undefined) {
        next()
    } else {
        res.send({
            code: 405,
            errmsg: "未登录，没有权限"
        })
    }
}

router.post("/", isLogin, async (req, res) => {

    const mail = req.session.username
    const oldPassword = jiami(req.body.oldpassword)
    const newPassword = jiami(req.body.newpassword)
    if (req.body.oldpassword == undefined || req.body.newpassword == undefined) {
        res.send({
            code: 400,
            errmsg: "参数不全"
        })
    }

    const selectsqlstr = "select * from user where mail=? and password = ?"

    let resultselect = []
    try {
        resultselect = await sqlQuery(selectsqlstr, [mail, oldPassword])
    } catch (err) {
        console.log(resultselect)
        res.send({
            code: 500,
            errmsg: "系统错误"
        })
    }
    console.log(resultselect)

    if (resultselect.length == 0) {
        res.send({
            code: 400,
            errmsg: "密码错误"
        })
    }

    const updatesqlstr = "update user set password=? where (mail = ?)"
    let result = []
    try {
        result = await sqlQuery(updatesqlstr, [newPassword, mail])
    } catch (err) {
        res.send({
            code: 500,
            errmsg: "系统错误"
        })
    }
    console.log(result)
    res.send({
        code: 200,
        errmsg: "修改密码成功"
    })

})

module.exports = router