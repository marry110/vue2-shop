<template>
    <div>

        <div class="goods-info" @click="goGoodsPage">
            <div class="gods-image">
                <img v-lazy="goodsImage" width="100%" alt="">
                 
            </div>
            <div class="goods-name">{{goodsName}}</div>
            <div class="goods-price">{{goodsPrice|moneyFilter }}</div>

        </div>

    </div>
</template>

<script>

import {toMoney} from '@/filter/moneyFilter.js';
    export default {
        props:['goodsImage','goodsName','goodsPrice','goodsId'],
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    },
  methods: {
      goGoodsPage() {
          this.$router.push({name:'Goods',params:{goodsId:this.goodsId}})
        //   this.$router.push({name:'Goods',query:{goodsId:this.goodsId}}) 技术胖
        //   this.$router.push({path:'/Goods',query:{goodsId:this.goodsId}}) 对应的
        // name params
        // path query
          
      }
  },
        
    }
</script>

<style scoped>
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
}
.goods-price{
     padding: 0 8px;
     color: #e5017d;
      font-size: 14px;
}
</style>