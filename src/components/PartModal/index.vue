<template>
    <Smodal :show="isShowModal">
        <div class="modal-container" :class="{ showContent: showContent }">
            <section class="base-info">
                <img src="http://f12.baidu.com/it/u=2465775762,1509670197&fm=72" class="pro-img" />
                <section class="info-words">
                    <p class="price">￥9900</p>
                    <p class="selected-parts">已选配件: &nbsp;&nbsp;&nbsp;

                    </p>
                    <p class="selected-parts">已选服务: 

                    </p>
                </section>
                <div class="cancel-icon" @click="onCancel">×</div>
            </section>
            <scroll-view class="parts-list" scroll-y="true">
                <section class="part-section">
                    <h2 class="part-type">
                        <span>尊享服务</span>
                        <i>?</i>
                    </h2>
                    <ul class="parts-content">
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                    </ul>
                </section>
                <section class="part-section">
                    <h2 class="part-type">
                        <span>加价选件</span>
                        <i>?</i>
                    </h2>
                    <ul class="parts-content">
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                    </ul>
                </section>
            </scroll-view>  
            <div class="order-btn">购买</div>
        </div>
    </Smodal>
</template>

<script>
import Smodal from '../../base/Modal'

export default {
    data () {
        return {
            showContent: false,
            timer: null
        }
    },
    props: ['isShowModal', 'onCancel'],
    components: {Smodal},
    methods: {
        clearTimer () {
            this.timer = null;
        }
    },
    watch: {
        isShowModal (nValue) {
            this.timer = setTimeout(() => {
                this.showContent = nValue;
            }, 50)
        }
    },
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .modal-container {
        width: 100%;
        height: 700px;
        position: absolute;
        z-index: 210;
        left: 0;
        bottom: -900px;
        background-color: #fff;
        transition: bottom 0.3s;
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
            .cancel-icon {
                font-size: 60px;
                color: 999;
                display: inline-block;
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                color: #999;
                margin-left: 8px;
                margin-top: 8px;
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
        }
        & .showContent {
            bottom: 0;
        }
    } 

    .modal-container.showContent {
        bottom: 0;
    }
</style>
