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
                        <li v-for="(item,index) in titleItem" :key='index' @click="clickTitle(item)">
                            <!-- <img :src="imgUrl" alt=""> -->
                            <span class="icon" :class="item.type == 1 ? 'icon-doc-text':''" v-if="item.type == 1"></span>
                            <span class="icon" :class="item.type == 2 ? 'icon-wallet':''"  v-if="item.type == 2"></span>
                            <span class="icon" :class="item.type == 3 ? 'icon-gift':''"  v-if="item.type == 3"></span>
                            <span class="icon" :class="item.type == 4 ? 'icon-truck':''"  v-if="item.type == 4"></span>
                            <span>{{item.text}}</span>
                            <i v-if="item.num">{{item.num}}</i>
                        </li>
                    </ul>
                </div>
                <v-goods :data="orderList" :productStyle="productStyle" :type="type"></v-goods>
                <div class="noOrder" v-if="orderList.length == 0">{{noOrderText}}</div>
                <div class="load-more" v-if="loadMore">{{loadMoreText}}</div>
            </scroll-view>
        </div>   
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import goodInfo from "../../components/goodsInfo";

const mockData = [
                {
                    data: [{
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruoei8723894',
                            product_price: '399.00'
                        },
                        {
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruo212ei8723894',
                            product_price: '199.00'
                        }
                    ],
                    total: 5,
                    order_price: '18800.00',
                    order_num: '123121231231231231',
                    status: 1
                }, {
                    data: [{
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2847717430,1606509281&fm=58&s=0272C8328CA07D0147EC71C6000030B0&bpow=121&bpoh=75',
                            productId:'2iruo2sd12ei8723894',
                            product_price: '699.00'
                        }
                    ],
                    total: 3,
                    order_price: '2000.00',
                    order_num: '123121231431231231',
                    status: 2
                } ,{
                    data: [{
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruoei8723894',
                            product_price: '399.00'
                        },
                        {
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruo212ei8723894',
                            product_price: '199.00'
                        }
                    ],
                    total: 5,
                    order_price: '18800.00',
                    order_num: '123121231231231231',
                    status: 3
                },{
                    data: [{
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruoei8723894',
                            product_price: '399.00'
                        },
                        {
                            info: 'ThinkPad X1 Carbon 14寸超级笔记本（i7-6500U 8GB SSD FHD IPS Win10',
                            img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051',
                            productId:'2iruo212ei8723894',
                            product_price: '199.00'
                        }
                    ],
                    total: 5,
                    order_price: '18800.00',
                    order_num: '123121231231231231',
                    status: 4
                }

            ] 
export default {
    data () {
        return {
            num: 18,
            loadMore: false,
            loadMoreText: '没有更多订单',
            noOrderText: '您还没有相关订单，去智享生活商城看看吧~',
            productStyle: 'myOrder',
            type: 1,
            titleItem: [
                {type: 1,text: '全部',imgUrl: ''}, 
                {type: 2,text: '代付款',imgUrl: '',num: 200}, //1
                {type: 3,text: '待发货',imgUrl: ''}, //2
                {type: 4,text: '待收货',imgUrl: ''} //3
            ],
            orderList: []
        }
    },
    components: {
       'v-goods': goodInfo
    },
    watch: {
        orderList () {}
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
            let _para = {
                pageNum: pageNum,
                pageSize: 10,
                type: 0
            }
            this.orderList =  mockData ;
            this.loadMore = true;
            // TODO
        },
        clickTitle (item) {
            this.type = item.type;
        },
        lower (e) {
            console.log(1111)
            if(!this.loadMore) {
                wx.showLoading({
                    title: '加载中',
                    duration: 2000
                })
            }
            

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
                    max-width: 50px;
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
