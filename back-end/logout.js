const express = require("express")

const router = express.Router()

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

router.get("/",isLogin, (req, res) => {
    
    req.session.username = undefined
    res.send({
        code : 200,
        errmsg : "退出登录成功"
    })

})

module.exports = router