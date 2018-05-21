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
                    <p>
                        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
                            <input class="picker" v-model="selected" disabled>
                        </picker>
                        <i class="icon-right-open"></i>
                    </p>
                </div>
                <div class="address defaultStyle">
                    <span>详细地址:</span>
                    <p>
                        <textarea auto-height v-model="address"/>
                    </p>
                </div>
                
            </div>
            <v-product :data="productData"></v-product>
            <!----------------------information--------------------------------- -->
        </div>   
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import productInfo from "../../components/productInfo";
export default {
    data () {
        return {
            text: '',
            collecUsertName: '',
            address: '',
            selected: '',
            index: 0,
            region: [],
            customItem: '全部',
            productData: {
                info:'test1111'
            }
        }
    },
    components: {
        'v-product': productInfo
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
        bindRegionChange: function(e) {
           let _region = e.target.value;
           this.selected = `${_region[0]} ${_region[1]} ${_region[2]}`
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
                    position: relative;
                    i {
                        position: absolute;
                        right: 0;
                        top: 10px;
                        transform: scale(1.5)
                    }
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
