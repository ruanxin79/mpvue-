<template>
    <div class="under-bg">
        <div class="modal-container">
            <section class="base-info error">
                <div class="pay-title"><i class="icon icon-help-circled-alt"></i>支付失败</div>
                <div class="pay-info">请前往‘我的订单’再次支付，</div>
                <div class="pay-info">如已付款，请‘联系客服’获取帮助。</div>
                <div class="pay-time">{{num}}{{payInfo}}</div>
            </section>
        </div>
    </div>        
</template>

<script>

export default {
    data () {
        return {
            num: 5,
            payInfo: '秒后自动跳转至‘我的订单’页',
            timer: null
        }
    },
    methods: {
        /* 支付失败 */
        payError () {
            clearInterval(this.timer);
            this.timer =setInterval(()=>{
                this.num --
                if(this.num < 1) {
                    this.$emit('hideModal')
                    wx.navigateTo({url: `/pages/myOrder/main`})
                    clearInterval(this.timer);              
                }
            },1000)
            
        },
    },
    watch: {
        
    },
    mounted () {
       this.payError();
    },
   
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .under-bg {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 210;
        background-color: rgba(0, 0, 0, 0.5)
    }
    .modal-container {
        width: 530px;
        height: 330px;
        position: absolute;
        z-index: 250;
        left: 50%;
        top: 50%;
        margin-top: -165px;;
        margin-left: -265px;
        .base-info {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background-color: #ffffff;
        }
        .pay-title {

            font-size: 44px;
            font-weight: bold;
            text-align: center;
            padding: 30px 0;
            margin-top: 10px;
            i {
                display: inline-block;
            }
        }
        .pay-info {
            font-size: 24px;
            text-align: center;
            padding: 5px 0; 
        }
        .pay-time {
            font-size: 22px;
            color: $yellow;
            text-align: center;
            padding: 25px 0;
        }
        .success {
            
            .pay-btn {
                width: 530px;
                position: absolute;
                bottom: 5px;
                left: 0;
                text-align: center;
                display: flex;
                border-top: 1rpx solid $yellow; 
                span {
                    flex: 1;
                    line-height: 70px;
                    height: 70px;
                    color: $yellow;
                    font-size: 28px;
                }
                span:first-child {
                    border-right: 1rpx solid $yellow; 
                }
            }
        }
    }
</style>

