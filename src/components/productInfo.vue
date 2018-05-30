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
          <img :src="k.product_thumb" alt="" mode="scaleToFill">
        </div>
        <div class="product-text">
          <p class="product-ellipsis">{{k.product_full_name}}</p>
          <p class="product-price right" v-if=" i == (item.computer.length-1)">共 <span>{{item.computer.length}}</span> 件商品 实付款 : <span>￥{{item.original_total}}</span></p>
        </div>
      </div>
      <div class="product-btn" v-if="item.status == 1">
        <button :type="item.status == 1 ? 'warn' : 'default' "
          :size="defaultSize" 
          :loading="loading" 
          :plain="plain"
          :disabled="disabled" 
          hover-class="other-button-hover"
          @click="payBtn"
          >{{item.status == 1 ? '立即支付' : '追踪订单'}}</button>
        <!-- <button :type="item.status == 1 ? 'warn' : 'default' " 
          :size="defaultSize" 
          :loading="loading" 
          :plain="plain"
          :disabled="disabled"     
          @click="handlerClick( item )"
          hover-class="other-button-hover">{{item.status == 1 ? '立即支付' : '追踪订单'}}</button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productInfo',
  props: ['data','productStyle','type'],
  data () {
    return {
      List: [],
      stateItem: ['交易关闭','待付款','已付款','已发货','交易成功','退款','异常'],
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      disabled: false,
      plain: false,
      loading: false
    }
  },
  watch: {
    data () {
      this.List = this.data.orderList;
      this.List.map((k) => {
        k.computer.map((i)=> {
          i.product_thumb = `https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=802846512,2896553177&fm=173&app=25&f=JPEG?w=218&h=146&s=397843838E5322C47C88EC3C0300F051`
        })
      })
    },
    type() {
      this.List = this.filterOrderList(this.data.orderList);
    }
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
    /* 追踪订单 、 立即支付  */
    handlerClick (item) { 
      wx.navigateTo({
        url: `/pages/orderdetail/main?product_id=${item.id}&code=${item.code}`
      })
    },
    payBtn () {
      this.$emit('showModal');
    }
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
        width: 100%;
        height: 125px;
        font-size: 24px;
        transform: scale(.85)
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
