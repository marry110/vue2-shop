const Koa=require('koa');
const app=new Koa()
const { connect, initSchemas } = require('./database/init');
const mongoose=require('mongoose')

const bodyParse=require('koa-bodyparser')
const cors=require('koa2-cors')

//路由引入
const Router=require('koa-router')

// 使用app.use
app.use(bodyParse())
app.use(cors())


let user=require('./appAPI/user')
let goods=require('./appAPI/goods')

//子路由挂载
let router=new Router()

router.use('/user',user.routes())
router.use('/goods',goods.routes())


// 加载路由中间件

app.use(router.routes())
app.use(router.allowedMethods())



app.use(async(ctx)=>{
    ctx.body='hello world'
})
;(async()=>{
    await connect()
    initSchemas()
//     const User=mongoose.model('User')
//     let oneUser=new User({userName:'jspang2',password:'123456'})
//     oneUser.save().then(()=>{
//         console.log('插入数据成功')

//     })

//     let user=await User.findOne({}).exec()
//     console.log('------------------')
// console.log(users)
// console.log('------------------')
})()

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})