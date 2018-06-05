<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <Slide :data="productDetail.head_images ? productDetail.head_images : []" />    
                <section class="product-intro">
                    <h2 class="title">{{productDetail.full_name}}</h2>
                    <p class="feature">{{productDetail.briefly}}</p>
                    <p class="price">￥{{productDetail.package_price}}</p>
                    <ul class="label">
                        <li class="label-item">7天</li>
                        <li class="label-item">优选</li>
                        <li class="label-item">包邮</li>
                    </ul>
                </section>
                <section class="sale-menu" v-if="productDetail.gifts && productDetail.gifts.length > 0" @click="showGiftModel">
                    <p class="cont">促销</p>
                    <p class="sale-word">赠</p>
                    <p class="selected-reminder">
                        {{productDetail.gifts && productDetail.gifts.length > 0 ? productDetail.gifts[0].full_name+'等'+productDetail.gifts.length+'个' : ''}}
                    </p>
                </section>
<!--                 <section class="sale-menu" @click="showPartModal">
                    <p class="cont">服务选件</p>
                    <p class="is-select">已选</p>
                    <p class="selected-reminder">一年意外保护等4个</p>
                </section> -->
                <section class="detail-img-cont">
                    <img :src="item.image" v-for="item in productDetail.detail_images" :key="item.id" class="det-img">
                </section>
            </scroll-view>
        </div>
        <div class="bottom-menu">
            <div class="btn-container">
                <div class="btn-item" @click="toHome">
                    <i class="icon-home sicon-normal"></i>
                    <span class="words-normal">首页</span>                    
                </div>
                <div class="btn-item buy" @click="toSetOrder">立即购买</div>
            </div>
        </div> 
        <PartModal 
            :isShowModal="isShowPartModal"
            :onCancel="partModalCancel"
        ></PartModal>
        <GiftModal v-if="giftModelVisible" title="促销"></GiftModal>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import {getProductDetail} from '../../utils/api'

import Slide from '../../components/Slide'

import PartModal from '../../components/PartModal'

import GiftModal from '../../components/GiftModal'

export default {
    data () {
        return {
            productImages: [
                {
                    image: "http://f12.baidu.com/it/u=2465775762,1509670197&fm=72",
                    key: '123'
                },
                {
                    image: "http://f12.baidu.com/it/u=2465775762,1509670197&fm=72",
                    key: '456'
                }
            ],
            isShowPartModal: false,
            giftModelVisible: false
        }
    },
    components: {
        Slide,
        PartModal,
        GiftModal
    },
    computed: {
        productDetail () {
            return store.state.productDetail
        },
    },
    methods: {
        init () {
            let {productId} = this.$root.$mp.query;
            if (productId) {
                //获取产品详情信息
                // productId = 'COMPUTER-654826';
                store.dispatch('requsetProductDetail', {productId})

                setPageTitle('智享生活 - 商品详情')
            }
        },
        partModalCancel () {
            this.isShowPartModal = false;
        },
        // showPartModal () {

        //     this.isShowPartModal = true;
        // },
        toSetOrder () {
            wx.navigateTo({url: `/pages/order/main`})
        },
        toHome () {
            wx.navigateTo({url: `/pages/index/main`})
        },
        showGiftModel () {
            setTimeout(() =>{
                this.giftModelVisible = true
            }, 500)
            
            // console.log(this.productDetail.gifts)
        }
    },
    onLoad () {
        this.init()
    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";


    .under-bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.2);
        z-index: 200;
    }

    .modal-container {
        width: 100%;
        height: 700px;
        position: absolute;
        z-index: 210;
        left: 0;
        bottom: -700px;
        background-color: #fff;
        .base-info {
            .pro-img {
                width: 200px;
                height: 200px;
                margin-left: 20px;
                position: relative;
                z-index: 210;
                top: -40px;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                vertical-align: top;
            }
            .info-words {
                display: inline-block;
                width: 460px;
                vertical-align: top;
                .price {
                    margin-top: 40px;
                    margin-left: 40px;
                    font-size: 30px;
                    font-weight: 600;
                    color: $red;
                }
                .selected-parts {
                    width: 100%;
                    line-height: 40px;
                    font-size: 26px;
                    margin-top: 10px;
                    margin-left: 40px;
                    color: #999;

                }

            }
        }

        .parts-list {
            width: 100%;
            height: 400px;
        }

        .part-section {
            .part-type {
                padding-left: 20px;
                padding-right: 20px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                span {
                    font-size: 28px;
                }
            }

            .parts-content {
                word-wrap: wrap;
                .parts-content-item {
                    display: inline-block;
                    margin-left: 22px;
                    margin-bottom: 10px;
                    width: 336px;
                    height: 46px;
                    line-height: 46px;
                    border-radius: 6px;
                    font-size: 22px;
                    border: 2px solid $yellow;
                    color: $yellow;
                    .name {
                        float: left;
                        margin-left: 14px;
                    }
                    .price {
                        float: right;
                        margin-right: 14px;
                    }
                }
            }
        }
        .order-btn {
            width: 100%;
            line-height: 100px;
            text-align: center;
            font-size: 40px;
            color: #fff;
            background-color: $yellow;
            position: fixed;
            left: 0;
            bottom: 0;
            z-index: 210;
        }
    }



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

        .product-intro {
            margin-top: 20px;
            padding: 20px;
            background-color: #fff;
            .title {
                font-size: 26px;
                line-height: 40px;
                font-weight: 600;
            }
            .feature {
                font-size: 24px;
                line-height: 40px;
                color: $red;
                font-weight: 400;
            }
            .price {
                font-size: 28px;
                color: $red;
                font-weight: 600;
                line-height: 40px;
            }
            .label {
                width: 660px;
                display: inline-block;
                margin-left: -10px;

                .label-item {
                    display: inline-block;
                    font-size: 24px;
                    color: $yellow;
                    border: 2px solid $yellow;
                    border-radius: 8px;
                    padding: 4px;
                    margin-left: 10px;
                    margin-bottom: 10px;
                }
            }
        }

        .sale-menu {
            margin-top: 2px;
            margin-bottom: 20px;
            line-height: 80px;
            padding: 0 20px;
            background-color: #fff;
            .cont {
                font-size: 28px;
                font-weight: 600;
                color: #999;
                display: inline-block;
                vertical-align: middle;
            }
            .sale-word {
                display: inline-block;
                vertical-align: middle;
                font-size: 22px;
                color: #fff;
                font-weight: 200;
                padding: 4px;
                line-height: 28px;
                border-radius: 6px;
                background-color: $yellow;
                margin-left: 10px;
            }
            .selected-reminder {
                display: inline-block;
                font-size: 24px;
                font-weight: 400;
                vertical-align: middle;
                color: #999;
                margin-left: 14px;
            }
            .is-select {
                display: inline-block;
                font-size: 24px;
                font-weight: 400;
                vertical-align: middle;
                color: $yellow;
                margin-left: 14px;                
            }
        }
        .detail-img-cont {
            .det-img {
                width: 750px;
                height: 900px;
            }
        }
    }    
</style>
