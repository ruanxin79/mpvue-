<template>
    <div class="under-back">
        <div class="modal-container">
            <div class="title">
                促销
                <div class="cancel-icon" @click="onCancel">×</div>
            </div>
            <scroll-view class="scroll-set" scroll-y="true">
                <div class="gift-item" v-for="item in gifts" :key="item.id">
                    <img :src="item.thumb" class="thumb"/>
                    <div class="content">
                        <div class="intro">{{item.full_name}}</div>
                        <div class="price">￥<span class="big">0</span>.00 <span class="orgin-price">￥{{item.package_original_price}}</span></div>
                    </div>
                </div>
            </scroll-view>
        </div>
    </div>
</template> 

<script>
import store from '../../store'
export default {
    data () {
        return {

        }
    },
    props: ['giftList', 'title'],
    methods: {
        onCancel () {
            this.isShowModal = false;
        }
    },
    computed: {
        gifts () {
            return store.state.productDetail.gifts
            // if (store.state.productDetail.gifts) {
            //     console.log(store.state.productDetail.gifts)
            //     return store.state.productDetail.gifts
            // }
            // else {
            //     return []
            // }
            
        },
    },
    watch: {
        gift () {
            this.gift = store.state.productDetail.gifts
        }
    },
    mounted () {
        setTimeout(() => {
            console.log(this.gifts)
        }, 2000)
    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .under-back {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 200;
    }
    .modal-container {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 210;
        width: 100%;
        height: 600px;
        background-color: #fff;
        .title {
            font-size: 30px;
            font-weight: 400;
            line-height: 80px;
            text-align: center;
            position: relative;
            .cancel-icon {
                position: absolute;
                z-index: 220;
                right: 0;
                top: 0;
                font-size: 40px;
                color: 999;
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #999;

            }
        }
        .scroll-set {
            padding: 0 20px;
            width: 100%;
            height: 440px;
            .gift-item {
                display: flex;
                flex-direction: row;
                margin-top: 20px;
                .thumb {
                    width: 200px;
                    height: 200px;
                    border: 1px solid #999;
                }
                .content {
                    margin-left: 10px;
                    width: 500px;
                    height: 200px;
                    display: flex;
                    flex-direction: column;
                    align-content: space-between;
                    .intro {
                        width: 100%;
                        font-size: 24px;
                        line-height: 40px;
                        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

                        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

                        -webkit-line-clamp: 2; /** 显示的行数 **/

                        overflow: hidden;  /** 隐藏超出的内容 **/
                    }
                    .price {
                        width: 100%;
                        font-size: 24px;        
                        color: $red;
                        .big {
                             font-size: 30px;    
                        }
                        .orgin-price {
                            color: #999;
                        }
                    }
                }
            }
        }
    } 
</style>
