<template>
    <div class="container">
        <div class="main">
            <scroll-view scroll-y class="inner" 
            @scrolltolower="lower"
            lower-threshold="50">
                <div class="title">
                    <h5>
                        我的订单
                        <span>共 {{num || 0}} 单</span>
                    </h5>
                    <ul class="title-item">
                        <li @click="changeTitle(0)"><span class="icon icon-doc-text"></span><span>全部</span></li>
                        <li @click="changeTitle(1)"><span class="icon icon-wallet"></span><span>待付款</span><i v-if="orderList.payOrder">{{orderList.payOrder}}</i></li>
                        <li @click="changeTitle(2)"><span class="icon icon-gift"></span><span>待发货</span><i v-if="orderList.deliverOrder">{{orderList.deliverOrder}}</i></li>
                        <li @click="changeTitle(3)"><span class="icon icon-truck"></span><span>待收货</span><i v-if="orderList.collectOrder">{{orderList.collectOrder}}</i></li>
                    </ul>
                </div>
                <ProductInfo 
                :data="orderList" 
                :productStyle="productStyle" 
                :type="status"
                @showModal="showModal"></ProductInfo>
                <div class="noOrder" v-if="orderList.length == 0">{{noOrderText}}</div>
                <div class="load-more" v-if="loadMore">{{loadMoreText}}</div>
            </scroll-view>
        </div> 
        <div class="bottom-menu">
            <div class="btn-container">
                <div class="btn-item" @click="toHome">
                    <i class="icon-home"></i>
                    <span class="words-active">首页</span>
                </div>
                <div class="btn-item">
                    <i class="icon-user sicon-normal"></i>
                    <span class="words-normal">我的订单</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import store from '../../store'

import { setPageTitle } from '../../utils/wx'
import { getOrderList } from "../../utils/api"
import ProductInfo from "../../components/productInfo"


export default {
    data () {
        return {
            num: '',
            loadMore: false,
            loadMoreText: '没有更多订单',
            noOrderText: '您还没有相关订单，去智享生活商城看看吧~',
            productStyle: 'myOrder',
            status: 0,
            orderList: [],
            userInfo: {},
            successModalVisible: false,
            failModalVisible: false,
            orderCode: ''
        }
    },
    components: {
        ProductInfo
    },
    watch: {
        orderList () {},
    },
    computed: {
        openId () {
            return store.state.openId
        }
    },
    methods: {
        /* 初始化 */
        init () {
            setPageTitle('我的订单');  
            this.getMyOrderList(1);  
            this.userInfo = store.state.userInfo       
        },
        /* 获取订单列表 */
        getMyOrderList (pageNum) {
           // 订单的状态（1待付款；2已付款；3已发货；如果status=0 则是全部订单）
            let _para = {
                openid: this.openId ,
                status: 0,
                index: 100,
                page: 1
            };
            wx.showLoading({
                title: '加载中'
            })
            getOrderList(_para).then((res)=>{
                wx.hideLoading()
                if(res.status_code === 200) {
                    this.orderList = res.data
                    this.num = res.data.orderList.length
                    this.loadMore = true
                }  
            }).catch((e)=>{
                console.log(e)
                wx.hideLoading()
            })
            
        },
        changeTitle (state) {
           this.status = state;
        },
        lower (e) {
            if(!this.loadMore) {
                wx.showLoading({
                    title: '加载中',
                    duration: 2000
                })
            }
        },
        showModal (callbackInfo) {
            if(callbackInfo === 'err') {
                //this.failModalVisible = true;
            }else if(callbackInfo ==='success') {
                //this.successModalVisible = true;
                this.getMyOrderList(1);  
            }
        },
        toHome () {
            //wx.navigateTo({url: `/pages/index/main`})
            wx.reLaunch({
                url: `/pages/index/main`
            })
        }
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

        .inner {
            width: 100%;
            height: 100%;
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
                .btn-item.buy {
                    font-size: 40px;
                    text-align: center;
                    line-height: 106px;
                    color: #fff;
                    background-color: $yellow;
                }
                .sicon-normal {
                    font-size: 30px;
                    color: $yellow; 
                    margin-top: 6px;
                }
                .sicon-active {
                    margin-top: 6px;
                    font-size: 30px;
                    color: $yellow;
                }
                .icon-home {
                    color: #999;
                    font-size: 30px;
                }
                .words-normal {
                    font-size: 26px;
                    color: $yellow;
                }
                .words-active {
                    font-size: 26px;
                    color: #999;
                }
            }
        }
        .title {
            background-color: #ffffff;
            font-size: $font-size;
            padding: 0 $padding-x; 
            margin-top: 10px;
            h5 {
                border-bottom: 1px solid $under-background; 
                line-height: 85px;
                font-weight: 800;
                span {
                    float: right;
                    color: $color;
                    font-weight: normal;
                }
            }
            ul {
                display: flex;
                text-align: center;
                padding-top: 16px;
                li {
                    flex: 1;
                    min-height: 130px;
                    padding: 25px 0;
                    position: relative;
                }
                li img {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                    background-color: $under-background;
                }
                li .icon {
                    font-size: 60px;
                }
                li span {
                    padding: 10px 0;
                    display: block;
                }
                li i {
                    color: #ffffff;
                    background-color: $red;
                    position: absolute;
                    transform: scale(.8);
                    top: 10px;
                    right: 12px;
                    min-width: 50px;
                    height: 50px;
                    line-height: 50px;
                    padding: 5px;
                    text-align: center;
                    border-radius: 50%;
                }
            }
        }

        .load-more {
            padding: 20px 0;
            text-align: center;
            font-size: 22px;
            color: #999999;
        }
        .noOrder {
            color: #999999;
            font-size: 22px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -25%;
        }
        
    }

</style>
