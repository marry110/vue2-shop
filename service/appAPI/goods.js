const Koa=require('koa')
const app=new Koa()

const Router=require('koa-router')
let router=new Router()
const mongoose=require('mongoose')

const fs=require('fs')

// goods 数据导入

router.get('/indertAllGoodsInfo',async(ctx)=>{
       fs.readFile('./datajson/newgoods.json','utf8',(err,data)=>{
           data=JSON.parse(data)
           let saveCount=0
           const Goods=mongoose.model('Goods')
           data.map((value,index)=>{
               console.log(value)
               let newGoods=new Goods(value)
               newGoods.save().then(()=>{
                   saveCount++
                   console.log('插入成功goods'+saveCount)
               })
               .catch(error=>{
                   console.log(error)
               })
           })
       })   
       ctx.body='开始导入数据' 
})

// insertAllCategory 数据导入

router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./datajson/category.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0;
        const Category=mongoose.model('Category')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategory=new Category(value)
            newCategory.save().then(()=>{
                saveCount++
                console.log('插入成功category'+saveCount)
            })
            .catch(error=>{
                console.log('插入数据失败'+error)
            })
        })

    

    })
    ctx.body="开始导入数据category"
})

//insertAllCategorySub 数据导入


router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./datajson/category_sub.json','utf8',(err,data)=>{
        data=JSON.parse(data)
        let saveCount=0
        const CategorySub=mongoose.model('CategorySub')
        data.RECORDS.map((value,index)=>{
            console.log(value)
            let newCategorySub=new CategorySub(value)
            newCategorySub.save().then(()=>{
                saveCount++
                console.log('插入数据categorysub'+saveCount)
            })
            .catch(error=>{
                console.log('插入数据失败'+error)
            })
        })

    })
    ctx.body='开始导入数据categorysub'
})


// 获取商品详情页面的接口

// ctx.request.body获取全部数据

router.post('/getDetalGoodsInfo',async(ctx)=>{
    try{
        let goodsId=ctx.request.body.goodsId
        const Goods=mongoose.model('Goods')
        let result=await Goods.findOne({ID:goodsId}).exec()
        ctx.body={code:200,message:result}
    }catch(error){
        ctx.body={code:500,message:error}
    }
})


// 得到大类的列表


router.get('/getCategoryList',async(ctx)=>{
    try{
        const Category=mongoose.model('Category')
        let result=await Category.find().exec()
        ctx.body={code:200,message:result}

    }catch(err){
         ctx.body={code:500,message:err}
    }
})
// 得到小类的列表
router.post('/getCateogrySubList',async(ctx)=>{
    try{
        // let categoryId=1
        let categoryId=ctx.request.body.categoryId
        const CategorySub=mongoose.model('CategorySub')
        let result=await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
        ctx.body={code:200,message:result}
    }catch(err){
        ctx.body={code:500,message:err}
    }
})
//获取商品类别数据接口
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
   try{
    //    let categorySubId='2c9f6c946016ea9b016016f79c8e0000'

       let categorySubId=ctx.request.body.categorySubId
       let page=ctx.request.body.page
       let num=10
       let start=(page-1)*num//开始位置

       const Goods=mongoose.model('Goods')
       let result=await Goods.find({SUB_ID:categorySubId})
       .skip(start).limit(num).exec()
       ctx.body={code:200,message:result}

   }catch(err){
        ctx.body={code:500,message:err}
   }
})


module.exports=router
