<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <Slide :data="banners" />       
                <CutLine content="精品活动" />
                <section class="activity">
                    <scroll-view class="activity-view" scroll-x="true">
                        <a class="activity-link" v-for="item in activates" :key="item.id">
                            <img :src="item.url" class="activat-img">
                        </a>
                    </scroll-view>
                </section>
                <CutLine content="热门商品" />
                <section class="product-containter">
                    <ul class="productlist">
                        <li v-for="item in productList" :key="item.id" @click="redirectToDetail(item.serial_number, item.product_name)">
                            <ProductItem :data="item" />
                        </li>
                    </ul>
                </section>
            </scroll-view>
        </div>
        <div class="bottom-menu">
            <div class="btn-container">
                <div class="btn-item">
                    <i class="icon-home sicon-active"></i>
                    <span class="words-active">首页</span>
                </div>
                <div class="btn-item" @click="redirectToMyOrder">
                    <i class="icon-user sicon-normal"></i>
                    <span class="words-normal">我的订单</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import {getBannerList, getOrderInfo, getHotProductList} from '../../utils/api'

import ProductItem from '../../components/ProductItem'

import Slide from '../../components/Slide'

import CutLine from '../../base/CutLine'

export default {
    data () {
        return {
            productList: []
        }
    },
    components: {
        ProductItem,
        CutLine,
        Slide
    },
    computed: {
        banners () {
            store.state.banners.forEach((item) => {item.image=item.url});
            return store.state.banners
        },
        activates () {
            return store.state.activates
        }
    },
    methods: {
        init () {
            setPageTitle('智享生活');
            store.dispatch('initPage', {})
            getHotProductList({page: 1,index: 1000}).then((res)=> {
                res.data.productList && res.data.productList.forEach((item) => {
                    var temp = [];
                    for (var k in item.sell_point) {
                        item.sell_point[k] && temp.push(item.sell_point[k])
                    }
                    item.other_sale_point = temp;
                    item.product_name = item.full_name;
                    item.sale_point_one = item.sell_point_1;
                    item.price = item.package_price;
                });
                
                this.productList = res.data.productList;
                
            })
        },
        redirectToDetail (id, productName) {
            wx.navigateTo({url: `/pages/productDetail/main?productId=${id}&productName=${productName}`})
        },
        redirectToMyOrder () {
            wx.navigateTo({url: `/pages/myOrder/main`})
        }
    },
    created () {
        //this.init()
    },
    mounted () {
        this.init()
    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";

    .container {
        position: fixed;
        height: 100%;
        width: 100%;
        background-color: $under-background;
        .main {
            width: 100%;  
            position: absolute;
            top: 0;
            bottom: 107px;          
        }
       
        .bottom-menu {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 106px;
            z-index: 10px;
            background-color: #f9f9f9;
            .btn-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                .btn-item {
                    width: 50%;
                    height: 100%;
                    flex-direction: column;
                    text-align: center;
                }
                .sicon-normal {
                    font-size: 30px;
                    color: #999; 
                    margin-top: 6px;
                }
                .sicon-active {
                    margin-top: 6px;
                    font-size: 30px;
                    color: $yellow;
                }
                .words-normal {
                    font-size: 26px;
                    color: #999;
                }
                .words-active {
                    font-size: 26px;
                    color: $yellow;
                }
            }
        }

        .inner {
            width: 100%;
            height: 100%;
        }

        .activity-view {
            width: 100%;
            height: 302px;
            white-space: nowrap; 
            display: flex;
            flex-direction: row;
            .activity-link {
                width: 288px;
                height: 302px;
                margin-left: 2px;
                display: inline-block;
            }
        }

        .activat-img {
            width: 288px;
            height: 302px;
            margin-left: 2px;
        }
        
    }

</style>
