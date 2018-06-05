<template>
    <div class="under-bg">
        <div class="modal-container">
            <section class="base-info success">
                <div class="pay-title"><i class="icon icon-help-circled-alt"></i>支付成功</div>
                <div class="pay-info">您可查看订单详情，</div>
                <div class="pay-info">或者继续浏览商城其他商品</div>
                <div class="pay-btn">
                    <span @click="routerPage('index')">再逛逛</span>
                    <span @click="routerPage('orderdetail')">查看订单</span>
                </div>
            </section>
        </div>
    </div>        
</template>

<script>
export default {
    data () {
        return {
    
        }
    },
    props:['orderCode'],
    methods: {
        /* 支付成功操作 */
        routerPage (page) {
            this.$emit('hideModal');
            if(page === 'index') {
                wx.navigateTo({
                    url: `/pages/${page}/main`
                })
            }else if( page=== 'orderdetail'){
                wx.navigateTo({
                    url: `/pages/${page}/main?code=${this.orderCode}`
                })
            }    
        },    
    },
    watch: {
        
    },
    mounted () {
        
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
                bottom: -5px;
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

