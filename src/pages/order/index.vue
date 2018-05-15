<template>
    <div class="container">
        <div class="main">
            <!-- ----------------------information--------------------------------- -->
            <div class="information">
                <div class="information-title"><span>配送信息</span></div>
                <div class="collecUsertName defaultStyle">
                    <span>收货人:</span>
                    <p><input v-model="collecUsertName"/></p>
                </div>
                <div class="phone defaultStyle">
                    <span>联系电话:</span>
                    <p><input v-model="phone"/></p>
                </div>
                <div class="selected defaultStyle">
                    <span>所在地区:</span>
                    <p class="fa-angle-right">
                        <picker mode="region" bindchange="bindRegionChange" :value="region" :custom-item="customItem">
                            <view class="picker">
                            {{region[0]}}，{{region[1]}}，{{region[2]}}
                            </view>
                        </picker>
                        <i></i>
                    </p>
                </div>
                <div class="address defaultStyle">
                    <span>详细地址:</span>
                    <p>
                        <textarea auto-height v-model="address"/>
                    </p>
                </div>
                
            </div>
            <!----------------------information--------------------------------- -->
        </div>   
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

const cityArray = ['美国', '中国', '巴西', '日本']
const cityArray2 = [
            {
                id: 0,
                name: '美国'
            },
            {
                id: 1,
                name: '中国'
            },
            {
                id: 2,
                name: '巴西'
            },
            {
                id: 3,
                name: '日本'
            }]
export default {
    data () {
        return {
            text: '',
            collecUsertName: '',
            selected: '',
            address: '',
            cityArray: [],
            cityArray2: [],
            index: 0,
            region: [],
            customItem: '全部'
        }
    },
    computed: {
        count () {
            return store.state.count
        }
    },
    methods: {
        init () {
            setPageTitle('填写订单');
        },
        clickHandle(text, event){
          console.log(text, e)
        },
        add(){
          store.commit('INIT_PAGE', {count: ++this.count})

          request('http://aaa.com.cn','get',{a: 1, b: 2})
        },
        bindPickerChange: function(e) {
            console.log(e)
            //this.selected = e.detail.value

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
        .fa-angle-right {
            position: relative;
            i {
                position: absolute;
                right: 0;
                top: 10px;
                width: 26px;
                height: 26px;
                border-bottom:5px solid $under-background; 
                border-right:5px solid $under-background; 
                transform: rotate(-45deg)
            }
        }
       /*  配送信息 */
        .information {
            margin-top: 10px;
            padding: $padding-x;
            background-color: #ffffff;
            div {
                font-size: $font-size;
                display: flex;
                padding: 28px 0;
                span{
                    width: 20%;
                }
                p{   
                    flex: 1;
                    padding:0 5px;
                    input,textarea {
                        width: 100%;  
                    }
                    textarea {
                        font-size: $font-size;
                        margin-top: -8px;
                    }
                }        
            }
            .defaultStyle {
                color: $color; 
                border-top: 1px solid $under-background; 
            }
        }
        
    }

</style>
