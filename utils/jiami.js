const crypto = require("crypto")

const jiami = (str) => {
    const saltStr = "unfg034" + str
    const mdobj = crypto.createHash("md5")
    mdobj.update(saltStr)
    return mdobj.digest("hex")
}

module.exports = jiami