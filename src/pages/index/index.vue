<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <section class="banner-cont">
                    <swiper indicator-dots>
                        <swiper-item>
                            <img src="http://f12.baidu.com/it/u=2465775762,1509670197&fm=72" class="slide-image" />
                        </swiper-item>
                        <swiper-item>
                            <img src="http://f12.baidu.com/it/u=2465775762,1509670197&fm=72" class="slide-image" />
                        </swiper-item>
                        <swiper-item>
                            <img src="http://f12.baidu.com/it/u=2465775762,1509670197&fm=72" class="slide-image" />
                        </swiper-item>
                    </swiper>
                </section>     
                <section class="sp-line">
                    <div class="line-r"></div>
                    <div class="line-content">精品活动</div>
                    <div class="line-r"></div>
                </section>
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
                <section class="sp-line">
                    <div class="line-r"></div>
                    <div class="line-content">全部商品</div>
                    <div class="line-r"></div>
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

import {getTreeNode} from '../../utils/api' 

export default {
    data () {
        return {
          
        }
    },
    computed: {
        count () {
            return store.state.count
        }
    },
    methods: {
        getUserInfo () {
            store.dispach('getUserInfo')
        },
        init () {
<<<<<<< HEAD
            setPageTitle('智享生活')
            wx.navigateTo({
                url: `/pages/order/main`
            })
        },
        clickHandle(text, event){
          console.log(text, e)
        },
        add(){
          store.commit('INIT_PAGE', {count: ++this.count})

          request('http://aaa.com.cn','get',{a: 1, b: 2})
=======
            setPageTitle('想帮帮');
            // this.getUserInfo()
>>>>>>> a0f73d6addf4ac92fe288afec5156ec4ce625ea2
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
        }

        .inner {
            width: 100%;
            height: 100%;
        }



        .banner-cont {
            height: 370px;
            width: 100%;         
        }
        .slide-image {
            height: 370px;
            width: 100%;            
        }
        swiper {
            height:370px;
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
        
        .sp-line {
            height: 62px;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: center;
            .line-r {
                width: 100px;
                height: 30px;
                border-bottom: 2px solid #c9c9c9;
            }
            .line-content {
                font-size: 24px;
                margin-left: 10px;
                margin-right: 10px;
                color: #000;
                line-height: 62px;
            }
        }
    }

</style>
