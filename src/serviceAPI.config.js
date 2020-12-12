const BASEURL="https://www.fastmock.site/mock/2c09351efd4d4728cfa9f54d8a2044dd/vue2-01/";

const LOCALURL="http://localhost:3000/"

const URL={
    getShoppingMallInfo:BASEURL+'indexvue2-01',
    registerUser:LOCALURL+'user/register',
    registertwoUser:LOCALURL+'user/registertwo',
    registerthreeUser:LOCALURL+'user/registerthree',
    loginone:LOCALURL+'user/loginone',
    logintwo:LOCALURL+'user/logintwo',
    loginthree:LOCALURL+'user/loginthree',

    // 详情页面
    getDetalGoodsInfo:LOCALURL+'goods/getDetalGoodsInfo',

    // 分类页面
    getCategoryList:LOCALURL+'goods/getCategoryList',
    getCateogrySubList:LOCALURL+'goods/getCateogrySubList',
    
    // 下拉加载
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',
    
    // http://localhost:3000/user/register
}
module.exports=URL