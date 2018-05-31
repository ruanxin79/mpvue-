<template>
    <Pmodal :show="isShowModal">
        <div class="modal-container">
            <section class="base-info error" v-if="payError">
                <div class="pay-title"><i class="icon icon-help-circled-alt"></i>{{title}}</div>
                <div class="pay-info">请前往‘我的订单’再次支付，</div>
                <div class="pay-info">如已付款，请‘联系客服’获取帮助。</div>
                <div class="pay-time">{{timer}}{{payInfo}}</div>
            </section>
            <section class="base-info success" v-if="paySuccess">
                <div class="pay-title"><i class="icon icon-help-circled-alt"></i>{{title}}</div>
                <div class="pay-info">您可查看订单详情，</div>
                <div class="pay-info">或者继续浏览商城其他商品</div>
                <div class="pay-btn">
                    <span @click="routerPage('index')">再逛逛</span>
                    <span @click="routerPage('order')">查看订单</span>
                </div>
            </section>
        </div>
    </Pmodal>
</template>

<script>
import Pmodal from '../../base/Modal'
import { getPayOrder } from "../../utils/api"
export default {
    data () {
        return {
            title: '',
            payRes: false,
            timer: 5,
            payError: false,
            paySuccess: false,
            payInfo: '秒后自动跳转至‘我的订单’页',
            Payment: {}
        }
    },
    props: ['isShowModal', 'onCancel'],
    components: {Pmodal},
    methods: {
        /* 支付失败 */
        clearTimer () {
            this.payError = true;
            this.title = '支付失败';
            var tiems =  setInterval(()=>{ 
                --this.timer;
                if(this.timer < 1) {
                    this.$emit('hideModal')
                    this.payError = false;
                    this.paySuccess = false;
                    clearInterval(tiems);
                }
            },1000) 
        },
        /* 支付成功 */
        paySuccess () {
            this.paySuccess = true;
            this.title = '支付成功'
        },
        /* 支付成功操作 */
        routerPage (page) {
            this.payError = false;
            this.paySuccess = false;
            this.$emit('hideModal');
            if(page === 'index') {
                wx.navigateTo({
                    url: `/pages/${_page}/main`
                })
            }else {
                this.$emit('getOrderList');
            }
            
        },
        /* 支付签名 */
        getPayInfo (item) {
            let _para = {
                code : item.code
            }

            getPayOrder(_para).then( (res) => {
                if(res.status_code === 200) {
                    this.Payment = res.data
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
                    _this.paySuccess();
                },
                'fail':function(res){
                    wx.hideLoading();
                    _this.clearTimer();
                }
            })
        }
    },
    watch: {
        isShowModal (nValue) {
            this.timer = 5; 
        }
    },
    mounted () {
        
    },
   
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
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

