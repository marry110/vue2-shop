<template>
<div>
    <div class="search-bar">
        <van-row>
            <van-col span="3">
                <img :src="locationIcon" width="80%" class="location-icon">
            </van-col>
            <van-col span="16">
                <input type="text" class="search-input">
            </van-col>
            <van-col span="5">
                <van-button size="mini" class="chazhao">查找</van-button>
            </van-col>

        </van-row>

    </div>
    <div class="swiper-area">
        <van-swipe :autoplay="1000">
            <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                <img v-lazy="banner.image" width="100%" alt="">

            </van-swipe-item>
        </van-swipe>

    </div>
    <div class="type-bar">
        <div v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="90%" class="cateimage">
            <span>{{cate.mallCategoryName}}</span>

        </div>

    </div>

    <div>
        <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="">
    </div>

    <div class="recommend-area">
        <div class="recommend-title">
            商品推荐
        </div>
        <div class="recommend-body">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                    <div class="recommend-item">
                        <img v-lazy="item.image" width="80%" alt="">
                        <div class="itemgoodsname">{{item.goodsName}}</div>
                        <div>￥{{item.price|moneyFilter}}(￥{{item.mallPrice|moneyFilter}})</div>

                    </div>

                </swiper-slide>
            </swiper>
        </div>
        <!-- <div class="floor">
            <div class="floor-anomaly">
                <div class="floor-one">
                    <img v-lazy="floor1_0.image" width="100%" alt="">
                </div>
                <div>
                    <div class="floor-two">
                        <img v-lazy="floor1_1.image" width="100%" alt="">
                    </div>
                    <div>
                        <img v-lazy="floor1_2.image" width="100%" alt="">
                    </div>
                </div>

            </div>
            <div class="floor-rule">
                <div v-for="(item,index) in floor1.slice(3)" :key="index">
                    <img v-lazy="item.image" width="100%" alt="">
                </div>

            </div>
          </div> -->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <div class="hot-area">

            <div class="hot-title">
                <div class="hot-title">
                    热卖商品

                </div>
                <div class="hot-goods">
                    <van-list>
                        <van-row gutter="20">
                            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                                <goodsInfoComponent :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfoComponent>
                            </van-col>
                        </van-row>
                    </van-list>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import {
    Swiper,
    SwiperSlide
} from 'vue-awesome-swiper';
import floorComponent from '../component/floorComponent';
import {
    toMoney
} from '@/filter/moneyFilter.js';
import 'swiper/swiper-bundle.css';
import goodsInfoComponent from '../component/goodsInfoComponent';
import url from '@/serviceAPI.config.js';

export default {
    data() {

        return {
            swiperOption: {
                slidesPerView: 3,
            },
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray: [],
            category: [],
            adBanner: '',
            recommendGoods: [],
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: {},
            hotGoods: [],
            //   floor1_0:{},
            //   floor1_1:{},
            //   floor1_2:{},
        }
    },
    components: {
        Swiper,
        SwiperSlide,
        floorComponent,
        goodsInfoComponent,
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money)
        }
    },

    created() {
        axios({
                // url:'https://www.fastmock.site/mock/2c09351efd4d4728cfa9f54d8a2044dd/vue2-01/indexvue2-01',
                url: url.getShoppingMallInfo,
                method: 'get',

            })
            .then(response => {
                console.log(response)
                if (response.status == 200) {
                    this.category = response.data.data.category;
                    this.bannerPicArray = response.data.data.slides;
                    this.adBanner = response.data.data.advertesPicture;
                    this.recommendGoods = response.data.data.recommend;
                    this.floor1 = response.data.data.floor1;
                    this.floor2 = response.data.data.floor2;
                    this.floor3 = response.data.data.floor3;
                    this.floorName = response.data.data.floorName;
                    this.hotGoods = response.data.data.hotGoods;
                    // this.floor1_0=this.floor1[0];
                    // this.floor1_1=this.floor1[1];
                    // this.floor1_2=this.floor1[2];

                }
            })
            .catch(error => {
                console.log(error)
            })
    }
}
</script>

<style scoped>
.search-bar {
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}

.search-input {
    width: 100%;
    height: 1.3rem;
    background-color: #e5017d;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    color: #fff;
}

.location-icon {
    padding-top: .2rem;
    padding-left: .3rem;
}

.chazhao {
    margin-left: 1rem;
}

.swiper-area {
    clear: both;
    max-height: 14rem;
    /* border: 1px solid red; */
    overflow: hidden;

}

.type-bar {
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
}

.type-bar div {
    flex: 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}

.recommend-area {
    background-color: #fff;
    margin-top: .3rem;
}

.recommend-body {

    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;

}

.recommend-item {
    width: 99%;
    border-right: 12px;
    font-size: 12px;
    text-align: center;
}

.itemgoodsname {
    color: black;
}

/* .floor-anomaly{
    display:flex;
    flex-direction: row;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}
.floor-anomaly div{
    widows: 10rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.floor-one{
    border-right: 1px solid #ddd;
}
.floor-two{
    border-bottom:1px soid #ddd;
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #fff;
}
.floor-rule div{
    width: 10rem;
    border-bottom: 1px solid #ddd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

}
.floor-rule div:nth-child(odd){
    border-right: 1px solid #ddd;
} */
.hot-goods {
    height: 130rem;
    overflow: hidden;
    background-color: #fff;
}
</style>
