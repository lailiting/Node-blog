//统计每种分类的文章有多少

const express = require("express")

const router = express.Router()
const sqlQuery = require("../mysql")
// 获取所有标签

function getart(cataloglist) {
    return new Promise((resovle, reject) => {
        let cataresult
        let catalogAll = []
        cataloglist.map(async (item, index) => {
            let artcatasqlstr = "select * from articlelist where catalog=?"
            try {
                cataresult = await sqlQuery(artcatasqlstr, [item.name])
                console.log(23423423435)
                console.log(cataresult)
            } catch (err) {
                res.send({
                    code: 500,
                    errmsg: "系统错误"
                })
                reject(err)
            }
            catalogAll.push({
                name: item.name,
                number: cataresult.length
            })
            console.log(catalogAll)
            if (index == cataloglist.length - 1) {
                console.log(11111)
                resovle(catalogAll)
            }
        })
    })
}

router.get("/", async (req, res) => {
    const sqlstr = "select * from catalog"
    let result
    try {
        result = await sqlQuery(sqlstr)
    } catch (err) {
        res.send({
            code: 500,
            errmsg: "系统错误"
        })
    }
    let cataresult
    let catalogAll = []
    result.map(async (item, index) => {
        let artcatasqlstr = "select * from articlelist where catalog=?"
        try {
            cataresult = await sqlQuery(artcatasqlstr, [item.name])
            console.log(23423423435)
            console.log(cataresult)
        } catch (err) {
            res.send({
                code: 500,
                errmsg: "系统错误"
            })
        }
        catalogAll.push({
            name: item.name,
            number: cataresult.length
        })
        if (index == result.length - 1) {
            res.send({
                code: 200,
                errmsg: "获取成功",
                data: catalogAll
            })
        }
    })


})

module.exports = router