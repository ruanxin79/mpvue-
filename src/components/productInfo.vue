<template>
  <div class="productInfo">
    <div class="product-list" v-for="( item, index ) in List" :key=" index ">
      <div class="product-status">
        <span>{{stateItem[item.status]}}</span>
      </div>
      <div class="product-title" 
        @click="handlerClick( item )"
        v-for="( k , i) in item.computer" :key="i">
        <div class="product-img">
          <img :src="k.product_thumb" alt="" mode="aspectFill">
        </div>
        <div class="product-text">
          <p class="product-ellipsis">{{k.product_full_name}}</p>
          <p class="product-price right" v-if=" i == (item.computer.length-1)">共 <span>{{item.productnumber || 1}}</span> 件商品 实付款 : <span>￥{{item.original_total}}</span></p>
        </div>
      </div>
      <div class="product-btn" v-if="item.status == 1">
        <button :type="item.status == 1 ? 'warn' : 'default' "
          :size="defaultSize" 
          :loading="loading" 
          :plain="plain"
          :disabled="disabled" 
          hover-class="other-button-hover"
          @click="payBtn(item)"
          >{{item.status == 1 ? '立即支付' : '追踪订单'}}</button>
      </div>
    </div>

    <SuccessModal v-if="successModalVisible" @hideModal="hideSuccessModal" :orderCode="orderCode"></SuccessModal>
    <FailModal v-if="failModalVisible" @hideModal="hideFailModal"></FailModal>
  </div>
</template>

<script>
import store from '../store'
import { getPayOrder } from "../utils/api"

import SuccessModal from './SuccessModal'
import FailModal from './FailModal'
export default {
  name: 'productInfo',
  props: ['data','productStyle','type'],
  data () {
    return {
      List: [],
      stateItem: ['交易关闭','待付款','待发货','已发货','交易成功'],
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      orderCode: '',
      Payment: {},
      num: 1,
      disabled: false,
      plain: false,
      loading: false,
      failModalVisible: false,
      successModalVisible: false
    }
  },
  watch: {
    data () {
      this.List = this.data.orderList;
    },
    type() {
      this.List = this.filterOrderList(this.data.orderList);
    }
  },
  components: {
      SuccessModal,
      FailModal
  },
  methods: {
    init () {
      this.List = this.data
    },
    filterOrderList(array) {
      let _newArr = []
        for(const i of array) {
          if(this.type == 0 ) {
            _newArr = this.data.orderList;
          }else if(i.status == this.type) {
            _newArr.push(i)
          }
        }
           
        return _newArr;
    },
    handlerClick (item) { 
      wx.navigateTo({
        url: `/pages/orderdetail/main?code=${item.code}`
      })
    },
    payBtn (item) {
      this.getPayInfo(item);
      this.orderCode = item.code
      store.state.disabled = false
    },
    /* 支付签名 */
    getPayInfo (item) {
        let _para = {
            code : item.code
        } 
        wx.showLoading()
        getPayOrder(_para).then( (res) => {
            if(res.status_code === 200) {
              this.Payment = res.data;
              this.orderPay();
            } else {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: res.message
              })
            }    
        }).catch((err)=>{
          console.log(err)
        })
    },
    /* 订单支付 */
    orderPay () {
        let _this = this;
        wx.hideLoading();
        wx.requestPayment({
          'timeStamp': String(this.Payment.timeStamp),
          'nonceStr': this.Payment.nonceStr,
          'package': this.Payment.package,
          'signType': this.Payment.signType,
          'paySign': this.Payment.paySign,
          'success':function(res){
              _this.$emit('showModal','success');
              _this.successModalVisible = true;
          },
          'fail':function(res){
              //_this.$emit('showModal','err');
              _this.failModalVisible = true;
          }
        })
    },
    hideSuccessModal () {
        this.successModalVisible = false;
    },
    hideFailModal () {
        this.failModalVisible = false;
    },
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
@import '../common/style/global.scss';
.product-list {
  margin-top: 20px;
  padding: 0 $padding-x; 
  background-color: #ffffff;
  .product-btn {
    width: 100%;
    height: 95px;
    padding: 30px 0; 
    button {
      float: right;
      min-width: 180px;
      border-radius: 10px; 
      transform: scale(.9)
    }
    button[type=default] {
      color: $red;
      background-color:#ffffff;
      border:1px solid $red;
    }
  }
  
 
  .product-status {
    text-align: right;
    padding: 35px 0;
    span {
      font-size: 26px; 
    }
  }
  .product-title {
    display: flex;
    padding: 35px 10px;
    border-top: 1px solid $under-background; 
    border-bottom: 1px solid $under-background; 
    .product-img {
      width: 195px;
      height: 125px;
      img {
        background-color: $under-background; 
        width: 100%;
        height: 125px;
        font-size: 24px;
        transform: scale(.9)
      }
    }
    .product-text {
      flex: 1;
      font-size: 24px;
      padding-left: 30px; 
      span {
        color: $red;
      }
      .product-ellipsis {
        word-wrap:break-word;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        min-height: 64px;
      }
      .product-price {
        color: #666666;
        margin-top: 20px;
      }
      .left {
        text-align: left;
      }
      .right {
        text-align: right;
      }
    }
  }
}
</style>
