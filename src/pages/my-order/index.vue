<template>
    <div class="container">
        <div class="main">
            <scroll-view scroll-y class="inner" 
            @scrolltolower="lower"
            lower-threshold="50">
                <div class="title">
                    <h5>
                        我的订单
                        <span>共 {{num}} 单</span>
                    </h5>
                    <ul class="title-item">
                        <li><span class="icon icon-doc-text"></span><span>全部</span></li>
                        <li><span class="icon icon-wallet"></span><span>待付款</span><i v-if="orderList.payOrder && orderList.payOrder != 0">{{orderList.payOrder}}</i></li>
                        <li><span class="icon icon-gift"></span><span>待发货</span><i v-if="orderList.deliverOrder && orderList.deliverOrder != 0">{{orderList.deliverOrder}}</i></li>
                        <li><span class="icon icon-truck"></span><span>待收货</span><i v-if="orderList.collectOrder && orderList.collectOrder != 0">{{orderList.collectOrder}}</i></li>
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
        <PayModal 
            :isShowModal="isShowPayModal"
            @hideModal="payModalCancel"
            @getOrderList='init'>
        </PayModal>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle,GetOrderList} from '../../utils/wx'

import ProductInfo from "../../components/productInfo"
import PayModal from '../../components/PayModal'
const mockData = {
    "status_code": 200,
    "data": {
        "orderList": [
            {
                "code": "2017042517321097485057",
                "original_total": "198",
                "total": "198.00",
                "status": 0,
                "product_id": 40,
                "product_thumb": "/a/b/c/d",
                "product_type": "computer",
                "product_full_name": "lenovo笔记本"
            },
            {
                "code": "2017042517314448979850",
                "original_total": "198",
                "total": "198.00",
                "status": 0,
                "product_id": 40,
                "product_thumb": "/a/b/c/d",
                "product_type": "computer",
                "product_full_name": "lenovo笔记本"
            }
        ],
        "payOrder": 0,
        "deliverOrder": 0,
        "collectOrder": 0,
        "successOrder": 1
    },
    "message": "Success"
}

export default {
    data () {
        return {
            num: '',
            loadMore: false,
            loadMoreText: '没有更多订单',
            noOrderText: '您还没有相关订单，去智享生活商城看看吧~',
            productStyle: 'myOrder',
            status: 1,
            orderList: [],
            isShowPayModal: false
        }
    },
    components: {
       ProductInfo,
       PayModal
    },
    watch: {
        orderList () {},
    },
    methods: {
        /* 初始化 */
        init () {
            setPageTitle('我的订单');
            wx.showLoading({
                title: '加载中',
            })
            setTimeout(() => {
                wx.hideLoading()
                this.getOrderList(1);
            }, 1000);
            
        },
        /* 获取订单列表 */
        getOrderList (pageNum) {
           // 订单的状态（1待付款；2已付款；3已发货；如果status=0 则是全部订单）
            let _para = {
                openid: 'oLHCTjpIGYEjkzj7ckIWLXifV1Yk',
                status: 0,
                index: 100,
                page: 1
            };
            this.orderList =  mockData.data ;
            this.num = mockData.data.orderList.length;
            this.loadMore = true;
            // TODO
        },
        clickTitle (item) {
            this.status = item.status;
        },
        lower (e) {
            console.log('上拉加载')
            if(!this.loadMore) {
                wx.showLoading({
                    title: '加载中',
                    duration: 2000
                })
            }
        },
        showModal () {
            this.isShowPayModal = true;
        },
        payModalCancel () {
            this.isShowPayModal = false
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

        .inner {
            width: 100%;
            height: 100%;
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
