<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <Slide :data="productImages" />       

                <CutLine content="精品活动" />

                <section class="activity">
                    <scroll-view class="activity-view" scroll-x="true">
                        <a href="http://www.baidu.com" class="activity-link">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526321979102&di=d27f54db64fc0ab102ee311c4690a443&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F15%2F69%2F38%2F35558PICqf8.jpg" class="activat-img">
                        </a>
                        <a href="http://www.baidu.com" class="activity-link">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526321979102&di=d27f54db64fc0ab102ee311c4690a443&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F15%2F69%2F38%2F35558PICqf8.jpg" class="activat-img">
                        </a>
                        <a href="http://www.baidu.com" class="activity-link">
                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526321979102&di=d27f54db64fc0ab102ee311c4690a443&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F15%2F69%2F38%2F35558PICqf8.jpg" class="activat-img">
                        </a>
                    </scroll-view>
                </section>
                <CutLine content="热门商品" />

                <section class="product-containter">
                    <ul class="productlist">
                        <li v-for="item in productList" :key="item.id" @click="redirectToDetail(item.id, item.product_name)">
                            <ProductItem :data="item" />
                        </li>
                    </ul>
                </section>
            </scroll-view>
        </div>
        <div class="bottom-menu">
            <div class="icon-container">
                <i class="icon-home"></i>
                <i class="icon-user"></i>
            </div>
        </div>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import ProductItem from '../../components/ProductItem'

import Slide from '../../components/Slide'

import CutLine from '../../base/CutLine'

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
            ]          
        }
    },
    components: {
        ProductItem,
        CutLine,
        Slide
    },
    computed: {
        productList () {

            //最终数据处理成这个样子
            return [
                {
                    id: 1,
                    sale_point_one: '联想笔记本就是好哈哈哈哈',
                    product_name: 'YOGA I5PRO(I7)',
                    other_sale_point: [
                        {
                            key: '123',
                            name: 'Itel I7低功耗版'
                        },
                        {
                            key: '456',
                            name: '内存4G'
                        },
                        {
                            key: '789',
                            name: 'Windows10'
                        },
                        {
                            key: '1123123',
                            name: '赠鼠标键盘'
                        }
                    ],
                    price: '9199.00'
                },
                {
                    id: 2,
                    sale_point_one: '联想笔记本就是好哈哈哈哈',
                    product_name: 'YOGA I5PRO(I7)',
                    other_sale_point: [
                        {
                            key: '123',
                            name: 'Itel I7低功耗版'
                        },
                        {
                            key: '456',
                            name: '内存4G'
                        },
                        {
                            key: '789',
                            name: 'Windows10'
                        },
                        {
                            key: '1123123',
                            name: '赠鼠标键盘'
                        }
                    ],
                    price: '9199.00'
                }
            ]
        }
    },
    methods: {
        getUserInfo () {
            store.dispatch('initPage', {})
        },
        init () {
            setPageTitle('想帮帮');
            this.getUserInfo()
        },
        redirectToDetail (id, productName) {
            wx.navigateTo({url: `/pages/productDetail/main?productId=${id}&productName=${productName}`})
        }
    },
    created () {
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
        }

        .inner {
            width: 100%;
            height: 100%;
        }

        .activity-view {
            width: 100%;
            white-space: nowrap; 
            display: flex;
            .activity-link {
                width: 288px;
                height: 302px;
                display: inline-block;
                margin-left: 2px;
            }
        }

        .activat-img {
            width: 288px;
            height: 302px;
        }
        
    }

</style>
