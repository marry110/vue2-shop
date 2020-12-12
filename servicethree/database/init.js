const mongoose=require('mongoose')
const db="mongodb://localhost/smile-vue203"

const glob=require('glob')
const {resolve}=require('path')

exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
    
}


exports.connect=()=>{
    mongoose.connect(db)
  
    let maxConnectTimes=0


    return new Promise((resolve,reject)=>{
        mongoose.connection.on('disconnected',()=>{
            console.log('。。。。。。。。。数据库断开。。。。。。。。。。。')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject()
                throw new error('、、、、、、、、、、程序出现错误，程序无法搞定，情人为处理、、、、、、、、、、、')
            }
           
        })
        mongoose.connection.on('error',(err)=>{
            console.log('。。。。。。。。。数据库错误。。。。。。。。。。。')
            if(maxConnectTimes<=3){
                maxConnectTimes++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new error('、、、、、、、、、、程序出现错误，程序无法搞定，情人为处理、、、、、、、、、、、')
            }
        })
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve()
        })
    })
   

}