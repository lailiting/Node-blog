const express = require("express")

const app = express()

const cookieParser = require("cookie-parser")
const session = require("express-session")


app.use(cookieParser('secret'));

app.use(session({
    secret: "xzsagjasoigjasoi",
    resave:true,//强制保存session
    cookie:{
      maxAge:7*24*60*60*1000,//设置session的有效期为1周
    },
    saveUninitialized:true//是否保存初始化的session
  }))
//解析post请求参数
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

//后台要用到的接口

//注册时的路由中间件
const signRouter = require("./back-end/sign")
const loginRouter = require("./back-end/login")
const booklistRouter = require("./back-end/bookList")
const catalogaddRouter = require("./back-end/addCatalog")
const tagaddRouter = require("./back-end/addTag")
const modifyPasswordRouter = require("./back-end/modifyPassword")
const addArticleRouter = require("./back-end/addArticle")
const logoutRouter = require("./back-end/logout")

//注册接口
app.use("/sign", signRouter)

app.use("/login", loginRouter)

app.use("/articlelist", booklistRouter)
app.use("/tag/add", tagaddRouter)
app.use("/catalog/add", catalogaddRouter)
app.use("/modify/password", modifyPasswordRouter)
app.use("/add/article", addArticleRouter)
app.use("/logout", logoutRouter)

// app.get("/", (req, res)=> {
//     res.send("请求成功")
// })

//前台要用到的接口
const getTagRouter = require("./front-end/getTag")
const getCatalogRouter = require("./front-end/getCatalog")
const getTagArtRouter = require("./front-end/getTagArt")
const getCataArtRouter = require("./front-end/getCataArt")
const getArtListRouter = require("./front-end/getArticleList")
const getArtTimeRouter = require("./front-end/getArticleTime")
const getArtContentRouter = require("./front-end/getArticleContent")
const getCatalogNumber = require("./front-end/getCataDetail")
const searchArticle = require("./front-end/searchArticle") 

//动态路由"select * from articlelist where catalog like '%' ? '%'"

app.use("/get/tags", getTagRouter)
app.use("/get/catalog", getCatalogRouter)
app.use("/tag/article", getTagArtRouter)
app.use("/get/articlelist", getArtListRouter)
app.use("/get/articletime", getArtTimeRouter)
app.use("/get/catalognumber", getCatalogNumber)
app.use("/search", searchArticle)
app.use("/", getCataArtRouter)
app.use("/", getArtContentRouter)
app.use("/", getTagArtRouter)


//监听端口，默认是8080
app.listen(5000, function(){
    console.log("服务器启动成功")
})