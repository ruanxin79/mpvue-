<template>
    <div class="container">
        <div class="main">
            <scroll-view scroll-y class="inner"
            @scrolltolower="lower" 
            lower-threshold="50" v-if="isShow">
                <!-- ----------------------orderdetail--------------------------------- -->
                <div class="order-detail">
                    <div class="orderdetail-title">
                        <div class="order-status">
                            <span class="icon icon-clock"></span>
                            <span>{{status}}</span>
                        </div>
                        <div class="acInfo">{{info}}</div>
                    </div>
                    <!-- <div class="order-logistics" v-if="orderDetail">
                        <div class="logistics-status">
                            <span>最新状态:</span>{{status}}
                        </div>
                        <div class="userInfo">
                            <span>{{orderDetail.customer}}:</span> {{orderDetail.phone}}
                        </div>
                    </div> -->
                    <div class="order-list">
                        <div v-for="(item, index) in orderList.product" :key="index">
                            <div class="goods-title" 
                                @click="handlerClick( item )">
                                <div class="goods-img">
                                    <img :src="item.product_thumb" alt="" mode="scaleToFill">
                                </div>
                                <div class="goods-text">
                                    <p class="goods-ellipsis">{{item.product_full_name}}</p>
                                    <p class="goods-price left" v-if="productStyle !='myOrder'"><span>￥{{item.product_price}}</span></p>
                                </div>
                            </div>
                            <div class="goods-tags">
                                <span v-for="(j,ind) in promiseInfo" :key="ind">{{j.title_icon}}</span>
                                <i class="icon icon-help-circled-alt"></i>
                            </div>
                            <ul class="goods-service">
                                <li v-for="(k,i) in item.gift" :key="i" v-if="item.gift">
                                    <span class="left">{{k.product_full_name}}</span>
                                    <span class="right"><s class="line-through">￥{{k.product_price}}</s><s>￥{{k.product_price}}</s></span>
                                </li>
                                <li v-for="(k,i) in item.service" :key="i" v-if="item.service">
                                    <span class="left">{{k.product_full_name}}</span>
                                    <span class="right"><s class="line-through">￥{{k.product_price}}</s><s>￥{{k.product_price}}</s></span>
                                </li>
                                <li v-for="(k,i) in item.part" :key="i" v-if="item.part">
                                    <span class="left">{{k.product_full_name}}</span>
                                    <span class="right"><s class="line-through">￥{{k.product_price}}</s><s>￥{{k.product_price}}</s></span>
                                </li>
                                <li v-for="(k,i) in item.recommend" :key="i" v-if="item.recommend">
                                    <span class="left">{{k.product_full_name}}</span>
                                    <span class="right"><s class="line-through">￥{{k.product_price}}</s><s>￥{{k.product_price}}</s></span>
                                </li>
                            </ul>
                            <!-- <div class="goods-explain">
                                说明: {{item.explain}}
                            </div> -->
                        </div>
                    </div>
                    <div class="order-price">
                        <p class="zxg_discount" >尊享卡优惠<span v-if="orderList.zxg_discount">￥{{orderList.zxg_discount}}</span></p>
                        <p class="service_price" >客服调价<span v-if="orderList.service_price">￥{{orderList.service_price}}</span></p>
                        <p class="total_price">合计（免运费）<span>￥{{orderList.original_total}}</span></p>
                    </div>
                    <div class="goods-line"><i></i></div>
                    <div class="payment">
                        <p>需支付<span>￥{{orderList.total}}</span></p>
                    </div>
                </div>
                <div class="order-msg">
                    <p><span class="order-msg-num">订单编号</span> : <span class="msg">{{orderList.code}}</span></p>
                    <p><span class="order-msg-time">下单时间</span> : <span class="msg">{{orderList.created_at}}</span></p>
                    <p><span class="order-msg-receipts">发票信息</span> : <span class="msg">{{orderList.invoice_personal}}</span></p>
                    <p><span class="order-msg-mark">备&nbsp;&nbsp;注</span> : <span class="msg">{{orderList.address}}</span></p>
                </div> 
            </scroll-view> 
            <div class="noOrder" v-else>{{noOrderText}}</div>
             <!----------------------orderdetail--------------------------------- -->
        
        </div> 
        <PayModal 
            ref="children"
            :isShowModal="isShowPayModal"
            :callbackInfo="callbackInfo"
            @hideModal="payModalCancel"
            @getOrderList='getOrderList(1)'>
        </PayModal>  
        <div class="bottom-menu" v-if="orderList.status == 1">
            <div class="btn-container">
                <div class="btn-item" @click="toHome">
                    <i class="icon-home sicon-normal"></i>
                    <span class="words-normal">首页</span>                    
                </div>
                <div class="btn-item buy" @click="toPayOrder">立即购买</div>
            </div>
        </div> 
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import { getOrderDetail ,getPayOrder} from '../../utils/api' 
      
import  PayModal from "../../components/PayModal"

const PROMISEINFO = [ {
                    "title":        "支持七天无理由退换货",
                    "title_icon":   "7天",
                    "desc":         "客户购买商品7日内（含7日，自客户收到商品次日起计算），在保证商品完好、赠品及附件齐全的前提下，可无理由退货。"
                    },
                    {
                    "title":        "商品均由商城精挑细选",
                    "title_icon":   "优选",
                    "desc":         "商城所有上架商品均经过精心挑选，我们会选择质量优、用户满意度高的商品。"
                    },
                    {
                    "title":        "购机用户提供一对一管家服务",
                    "title_icon":   "管家",
                    "desc":         "服务管家在机器的购买、使用、维修、更换时提供全流程协助支持。"
                    },
                    {
                    "title":        "新购机提供一站式上门安装服务",
                    "title_icon":   "上门lenovo",
                    "desc":         "购机30天内，智享生活商城免费赠送新机一站式上门安装服务，专业工程师将上门为用户提供开箱验机、网络调试、软件安装、电脑帮教等服务。"
                    },
                    {
                    "title":        "新购机提供一站式上门安装服务",
                    "title_icon":   "上门think",
                    "desc":         "购机30天内，智享生活商城免费赠送新机一站式上门安装服务，专业工程师将上门为用户提供开箱验机、网络调试、软件安装、电脑帮教等服务。"
                    },
                    {
                    "title":        "全场商品包邮",
                    "title_icon":   "包邮",
                    "desc":         "客户在智享生活商城购买的所有机器和配件（除服务外）等商品均由商城承担运费。"
                    }]
export default {
    data () {
        return {
            info: '好商品不等人，请尽快完成付款',
            noOrderText: '您还没有相关订单，去智享生活商城看看吧~',
            orderList: {},
            orderDetail: {},
            userInfo: {},
            status: '',
            callbackInfo: '',
            loadMore: false,
            isShow: false,
            isShowPayModal: false,
            promiseInfo: PROMISEINFO,
            code: '',
            id: ''
        }
    },
    components: {
       PayModal
    },
    watch: {
        orderList () {
            // this.orderList.product.map((k) => {
            //    k.product_thumb = `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051`
            // })
            this.status = this.setStatus(this.orderList.status);
        }
    },
    computed: {
        openId () {
            return store.state.openId
        }
    },
    methods: {
        init () {
            // 地址栏传参
            let {code} = this.$mp.query;
            setPageTitle('订单详情')
            this.getOrderDetailList(code)
        },
        /* 商品详情 */
        handlerClick (item) {
            wx.navigateTo({
                url: `/pages/productDetail/main?productId=${item.productId}&code=${item.code}`
            })
        },
        /* 订单列表 */
        getOrderDetailList (code) {
            let _para = {
                orderCode: code,
                openid: this.openId
            }
            wx.showLoading({
                title: '加载中',
            })
            getOrderDetail(_para).then( (res) => {
                wx.hideLoading()
                if(res.status_code ===200) {
                    this.isShow = res.data.product.length!=0 ? true : false
                    this.orderList = res.data
                }
            }).catch((e) => {
                wx.hideLoading()
                console.log(e)
            })
            this.loadMore = true;
        },
        setStatus (status) {
            let x = '';
            switch (status) {
                case 0:
                    x = '交易关闭'
                    break;
                case 1:
                    x = '待付款'
                    break;
                case 2:
                    x = '已付款'
                    break;
                case 3:
                    x = '已发货'
                    break;
                case 4:
                    x = '交易成功'
                    break;
                case 5:
                    x = '退款'
                    break;
                case 6:
                    x = '异常'
                    break;
            }
            return x;   
        },
        lower (e) {
            if(!this.loadMore) {
                wx.showLoading({
                    title: '加载中',
                    duration: 2000
                })
            }
        },
        payModalCancel () {
            this.isShowPayModal = false
        },
        showModal (callbackInfo) {
            this.isShowPayModal = true;
            this.callbackInfo = callbackInfo;
        },
        toPayOrder () {
            let item = {
                code: this.$mp.query.code
            }
           this.getPayInfo(item)
        },
        /* 支付签名 */
        getPayInfo (item) {
            let _para = {
                code : item.code
            }
            getPayOrder(_para).then( (res) => {
                if(res.status_code === 200) {
                this.Payment = res.data;
                this.orderPay();
                }     
            })
        },
        /* 订单支付 */
        orderPay () {
            let _this = this;
            wx.showLoading()
            wx.requestPayment({
            'timeStamp': String(this.Payment.timeStamp),
            'nonceStr': this.Payment.nonceStr,
            'package': this.Payment.package,
            'signType': this.Payment.signType,
            'paySign': this.Payment.paySign,
            'success':function(res){
                wx.hideLoading();
                _this.showModal("success")
            },
            'fail':function(res){
                wx.hideLoading();
                _this.showModal("err")
            }
            })
        },
        toHome () {
            wx.navigateTo({url: `/pages/index/main`})
        }
    },
    created () {
       
    },
    mounted () {
        this.init();
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
                .btn-item.buy {
                    font-size: 40px;
                    text-align: center;
                    line-height: 106px;
                    color: #fff;
                    background-color: $yellow;
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
        .orderdetail-title {
            width: 100%;
            height: 200px;
            background-image: url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJCOUM3NTVGNDY5OTExRTdCMTM5RTAyQ0E5RDU3OTBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjJCOUM3NTYwNDY5OTExRTdCMTM5RTAyQ0E5RDU3OTBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkI5Qzc1NUQ0Njk5MTFFN0IxMzlFMDJDQTlENTc5MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkI5Qzc1NUU0Njk5MTFFN0IxMzlFMDJDQTlENTc5MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAIBgYGBgYIBgYIDAgHCAwOCggI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);
            background-repeat: no-repeat;
            color: #ffffff;
            text-align: center;
            .order-status {
                font-size: 36px;
                padding: 40px 0 20px 0;
                .icon {
                    margin: 0 10px; 
                }
            }
            .acInfo {
                font-size: 22px;
            }
        }
        .order-detail {
             background-color: #ffffff;
        }
        .order-logistics {
            padding: 0 $padding-x;
            div {
                padding: 30px 0; 
                font-size: 24px;
                span {
                    min-width: 120px;
                    display: inline-block;
                }
            }
        }
        .order-list {
            background-color: #ffffff;
            >div{
                padding-bottom: 20px;
            }
        }
        .goods-line {
            height: 1px;
            margin-top: 30px;
            background-color: $line;
            position: relative;
            i {
                content: '1';
                position: absolute;
                width: 20px;
                height:20px;
                right: 55px;
                top:-10px;
                background-color: #ffffff;
                color: transparent;
                border: 1px solid $line;
                border-bottom-color: transparent;
                border-right-color: transparent;
                transform: rotate(45deg);
            }
        }
        .goods-title {
            display: flex;
            padding: 35px 10px 10px 10px;
            border-top: 1px solid $line; 
            border-bottom: 1px solid $line; 
            .goods-img {
                width: 195px;
                height: 125px; 
                img {
                    width: 100%;
                    height: 125px;
                    font-size: 24px;
                    transform: scale(.85)
                }
            }
            .goods-text {
                flex: 1;
                font-size: 24px;
                padding-left: 30px; 
                span {
                    color: $red;
                }
                .goods-ellipsis {
                    word-wrap:break-word;
                    display: -webkit-box;
                    overflow: hidden;
                    white-space: normal!important;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    min-height: 65px;
                }
                .goods-price {
                    color: #666666;
                    margin-top: 20px;
                }
                .left {
                    text-align: left;
                }
                .right {
                    text-align: right;
                }
            }
        }
        .goods-tags {
            padding: 0 $padding-x;
            margin: 20px 0 20px 0;
            position: relative;
            color: $yellow;
            span {
                font-size: 24px;
                color: $yellow;
                border: 2px solid $yellow;
                border-radius: 8px;
                padding: 4px;
                margin-right: 10px;
                margin-bottom: 10px;
            }
            i {
                color: #828282;
                position: absolute;
                right: $padding-x;
                top: 0;
                transform: scale(1.2)
            }
        }
        .goods-service {
            padding: 0 $padding-x;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            font-size: 22px;
            color: #999999;
            display: grid;
            grid-template-columns: 49% 49%;
            li {
                display: flex;
                justify-content: space-between;
                border: 1px solid #828282;
                border-radius: 10px;
                height: 45px;
                line-height: 45px;
                padding: 0 10px;
                margin: 10px 0;
                :nth-child(odd) {
                    margin-right: 5px;
                }
                .left {
                    max-width: 216px;
                    height: 45px;
                    overflow: hidden;
                }
                span {
                    display: flex;
                    s.line-through{
                        font-size: 18px;
                        text-decoration: line-through;   
                    }
                }
            }
        }
        .goods-explain {
            padding: 0 $padding-x;
            font-size: 22px;
            color: #666666;
        }
        .order-price ,.payment{
            padding: 0 $padding-x;
            color: $color;
            font-size: 24px;
            p{
               clear: both; 
               margin-top: 18px;
            }
            span {
                float: right;
                font-size: $font-size;
            }
        } 
        .payment {
            padding-top: 30px;
            padding-bottom: 30px;
            font-size: 26px;
            color: #171717;
            p {margin-top: 0 }
            span {
                color: $red;
            }
        }
        .total_price {
            font-size: 24px;
            color: #171717;
        }

        .order-msg {
            padding: 30px $padding-x; 
            margin-top: 20px;
            font-size: 22px;
            color: #999999;
            background-color: #ffffff;
            p {
                padding: 10px 0;
            }
        }
        .noOrder {
            font-size: $font-size;
            color: #999999;
            text-align: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
        }

    }

</style>
