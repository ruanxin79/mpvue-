<template>
  <div class="goodsiInfo">
    <div class="goods-list" v-for="( item, index ) in List" :key=" index ">
      <div class="goods-status">
        <span v-if="item.status == 1 ">待付款</span>
        <span v-if="item.status == 2 ">待发货</span>
        <span v-if="item.status == 3 ">待收货</span>
      </div>
      <div class="goods-title" 
        v-for="( k , v) in item.data" 
        :key=" v ">
        <div class="goods-img">
          <img :src="k.img" alt="" mode="scaleToFill">
        </div>
        <div class="goods-text">
          <p class="goods-ellipsis">{{k.info}}</p>
          <p class="goods-price right" v-if=" v == item.data.length-1 && productStyle =='myOrder'">共 <span>{{item.data.length}}</span> 件商品 实付款 : <span>￥{{item.order_price}}</span></p>
          <!-- <p class="goods-price left" v-if="productStyle !='myOrder'"><span>￥{{k.product_price}}</span></p> -->
        </div>
      </div>
      <div class="goods-btn" v-if="productStyle =='myOrder'">
        <button :type="item.status == 1 ? 'warn' : 'default' " 
          :size="defaultSize" 
          :loading="loading" 
          :plain="plain"
          :disabled="disabled"     
          @click="handlerClick( item )"
          hover-class="other-button-hover">{{item.status == 1 ? '立即支付' : '追踪订单'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodInfo',
  props: ['data','productStyle','type'],
  data () {
    return {
      List: [],
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      disabled: false,
      plain: false,
      loading: false
    }
  },
  filters: {
   
  },
  watch: {
    data () {
      this.List = this.data
    },
    type() {
      this.List = this.filterArray(this.data);
    }
  },
  methods: {
    init () {
      this.List = this.data
    },
    filterArray(array) {
      let _newArr = []
        for(const i of array) {
          if(this.type == 1) {
            _newArr = this.data;
          }else if(i.status == this.type){
            _newArr.push(i)
          }  
        }
        return _newArr;
    },
    /* 追踪订单 、 立即支付  */
    handlerClick (item) { 
      if(item.status == 1) {
        wx.navigateTo({
          url: `/pages/orderdetail/main?orderId=${item.order_num}`
        })
      }else {
        
      }
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
.goods-list {
  margin-top: 20px;
  padding: 0 $padding-x; 
  background-color: #ffffff;
  .goods-btn {
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
  
 
  .goods-status {
    text-align: right;
    padding: 35px;
    span {
      font-size: 26px; 
    }
  }
  .goods-title {
    display: flex;
    padding: 35px 10px;
    border-top: 1px solid $under-background; 
    border-bottom: 1px solid $under-background; 
    .goods-img {
      width: 195px;
      height: 125px; 
      img {
        width: 100%;
        height: 125px;
        font-size: 24px;
        transform: scale(.85)
      }
    }
    .goods-text {
      flex: 1;
      font-size: 24px;
      padding-left: 30px; 
      span {
        color: $red;
      }
      .goods-ellipsis {
        word-wrap:break-word;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal!important;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .goods-price {
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
