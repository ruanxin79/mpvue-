<template>
  <div class="counter-warp">
    <p>Vuex counter：{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>

    <a href="/pages/index/main" class="home">去往首页</a>
    <view class="section">
      <view class="section__title">普通选择器</view>
      <picker @change="bindPickerChange" :value="index" :range="array">
        <view class="picker">
          当前选择：{{array[index]}}
        </view>
      </picker>
    </view>
  </div>
</template>

<script>
// Use Vuex
import store from './store'
export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
      store.commit('decrement')
    },
    bindPickerChange (e) {
      this.index = e.mp.detail.value

    }
  },
  data: {
      array: ['美国', '中国', '巴西', '日本'],
      index: 1
  },
  mounted() {
     
  }
}

</script>
<style>
.counter-warp {
  text-align: center;
  margin-top: 100px;
}
.home {
  display: inline-block;
  margin: 100px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}

</style>
