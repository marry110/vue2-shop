const Koa=require('koa')
const app=new Koa()
const {connect,initSchemas} =require('./database/init')
const mongoose=require('mongoose')

const bodyparser=require('koa-bodyparser')

const cors=require('koa2-cors')

const Router=require('koa-router')

app.use(bodyparser())
app.use(cors())

let user=require('./appAPI/user')


// 装在所有子路由

let router=new Router()
router.use('/user',user.routes())

// 加载中间件

app.use(router.routes())
app.use(router.allowedMethods())



app.use(async(ctx)=>{
    ctx.body='hello koa2'
})


;(async()=>{
    await connect()
    initSchemas()

    // const User=mongoose.model('User')
    // let oneUser=new User({userName:'jspang2',password:'123456'})
    // oneUser.save().then(()=>{
    //     console.log('插入成功')
    // })
    // let  users = await  User.findOne({}).exec()
    // console.log('------------------')
    // console.log(users)
    // console.log('------------------')


})()


app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})