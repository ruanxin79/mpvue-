<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <section class="banner-cont">
                    <swiper
                      autoplay interval duration="1">
                        <swiper-item>
                            <img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo_top_ca79a146.png" class="slide-image" />
                        </swiper-item>
                    </swiper>
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
            </scroll-view>
 
        </div>
        <div class="bottom"></div>
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
            setPageTitle('想帮帮');
            // this.getUserInfo()
        },
        clickHandle(text, event){
          console.log(text, e)
        },
        add(){
          store.commit('INIT_PAGE', {count: ++this.count})

          request('http://aaa.com.cn','get',{a: 1, b: 2})
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
       
        .bottom {
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
            }
        }

        .activat-img {
            width: 288px;
            height: 302px;
        }
    }

</style>
