<template>
<div>

    <div class="navbar-div" fixed>
        <van-nav-bar title="类别列表" />

    </div>
    <div>
        <van-row>
            <van-col span="6">
                <div id="leftNav">

                    <ul>
                        <li v-for="(item,index) in category" :key="index" @click="clickCategory(index,item.ID)" :class="{categoryActive:categoryIndex==index}">
                            {{item.MALL_CATEGORY_NAME}}
                        </li>
                    </ul>

                </div>
            </van-col>
            <van-col span="18">
                <div class="tabCategorySub">
                    <van-tabs v-model="active" @click="onClickCategorySub">
                        <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">

                        </van-tab>
                    </van-tabs>

                </div>

                <div id="list-div">
                    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                        <van-list v-model="loading" :finished="finished" @load="onLoad">
                            <div class="list-item" v-for="(item,index) in goodsList" :key="index" @click="goGoodsInfo(item.ID)">
                                <div class="list-item-img">
                                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                                </div>
                                <div class="list-item-text">
                                    <div>
                                        {{item.NAME}}
                                    </div>
                                    <div class="list-item-price">
                                        {{item.ORI_PRICE|moneyFilter}}元
                                    </div>

                                </div>

                            </div>
                        </van-list>
                    </van-pull-refresh>

                </div>

            </van-col>
        </van-row>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {
    toMoney
} from '@/filter/moneyFilter.js';
export default {
    filters: {
        moneyFilter(money) {
            return toMoney(money)

        }

    },
    data() {
        return {
            category: [],
            categoryIndex: 0,
            categorySub: [],
            active: 0,
            list: [],
            loading: false,
            finished: false,
            isRefresh: false,
            page: 1,
            goodsList: [],
            categorySubId: '',
            errorImg: 'this.src="' + require('@/assets/images/erroring.png') + '"',

        }
    },
    created() {
        this.getCategory()

    },
    mounted() {
        let winHeight = document.documentElement.clientHeight
        document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
        document.getElementById('list-div').style.height = winHeight - 90 - 50 + 'px'
    },

    methods: {

        //left导航栏
        getCategory() {
            axios({
                    url: url.getCategoryList,
                    method: 'get',
                    data: {

                    }
                }).then(response => {
                    console.log(response)
                    if (response.data.code == 200 && response.data.message) {
                        this.category = response.data.message
                        this.getCategorySubByCategoryID(this.category[0].ID)
                    } else {
                        Toast('服务器错误数据获取失败')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },
        //背景颜色变化+点击一级导航获得二级导航
        clickCategory(index, categoryId) {
            this.categoryIndex = index
            this.page = 1
            this.finished = false
            this.goodsList = []
            this.getCategorySubByCategoryID(categoryId)

        },
        // 右侧导航栏根据大类ID 读取小类列表
        getCategorySubByCategoryID(categoryId) {
            axios({
                    url: url.getCateogrySubList,
                    method: 'post',
                    data: {
                        categoryId: categoryId
                    }
                })
                .then(response => {
                    console.log(response)
                    if (response.data.code == 200 && response.data.message) {
                        this.categorySub = response.data.message
                        this.active = 0
                        this.onLoad()
                        this.categorySubId = this.categorySub[0].ID
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        },

        //上拉加载案例

        // onLoad(){
        //     setTimeout(() => {
        //         for(let i=0;i<10;i++){
        //             this.list.push(this.list.length+1)
        //         }
        //         this.loading=false
        //         if(this.list.length>=40){
        //             this.finished=true
        //         }
        //     }, 500);
        // },
        onLoad() {
            setTimeout(() => {
                this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySub[0].ID
                this.getGoodsList()
            }, 500)

        },

        // 下拉刷新
        onRefresh() {
            setTimeout(() => {
                this.isRefresh = false
                this.finished = false
                this.goodsList = []
                this.page = 1
                this.onLoad()
            }, 500);
        },

        //下拉加载方法
        getGoodsList() {
            axios({
                    url: url.getGoodsListByCategorySubID,
                    method: 'post',
                    data: {
                        categorySubId: this.categorySubId,
                        page: this.page
                    }
                })
                .then(response => {
                    console.log(response)
                    if (response.data.code == 200 && response.data.message.length) {
                        this.page++
                        this.goodsList = this.goodsList.concat(response.data.message)

                    } else {
                        this.finished = true
                    }
                    this.loading = false
                })
                .then(error => {
                    console.log(error)
                })
        },
        //点击二级导航获得下拉菜单

        onClickCategorySub(index, title) {
            this.categorySubId = this.categorySub[index].ID
            console.log('categorySubId' + this.categorySubId)
            this.goodsList = []
            this.finished = false
            this.page = 1
            this.onLoad()
        },

        goGoodsInfo(id) {
            this.$router.push({
                name: 'Goods',
                params: {
                    goodsId: id
                }
            })
            // this.$router.push({path:'/Goods',query:{goodsId:id}})

        }
    },
}
</script>

<style scoped>
#leftNav {
    background-color: aqua;
}

#leftNav ul li {
    line-height: 2rem;
    border-bottom: 1px solid #E4E7ED;
    padding: 3px;
    font-size: 0.8rem;
    text-align: center;
}

.categoryActive {
    background-color: #FFF;
}

.list-item {
    display: flex;
    flex-direction: row;
    font-size: 0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding: 5px;
}

#list-div {
    overflow: scroll;
}

.list-item-img {
    flex: 8;
}

.list-item-text {
    flex: 16;
    margin-top: 10px;
    margin-left: 10px;
}

.list-item-price {
    margin-top: .3rem;
    color: red;
}
</style>
