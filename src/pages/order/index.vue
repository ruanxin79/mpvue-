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
                        <view class="section__title">省市区选择器</view>
                        <picker mode="region" bindchange="bindRegionChange" :value="region" :custom-item="customItem">
                            <view class="picker">
                            当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
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
            region: ['广东省', '广州市', '海珠区'],
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
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.selected = e.detail.value

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
            background-image: url('data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZCNjBEQTYzM0VCRDExRTdCRTBGREJBMjU2OUFDNDM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZCNjBEQTY0M0VCRDExRTdCRTBGREJBMjU2OUFDNDM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkI2MERBNjEzRUJEMTFFN0JFMEZEQkEyNTY5QUM0MzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkI2MERBNjIzRUJEMTFFN0JFMEZEQkEyNTY5QUM0MzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAIBgYGBgYIBgYIDAgHCAwOCggICg4QDQ0ODQ0QEQwODQ0ODBEPEhMUExIPGBgaGhgYIyIiIiMnJycnJycnJycnAQkICAkKCQsJCQsOCw0LDhEODg4OERMNDQ4NDRMYEQ8PDw8RGBYXFBQUFxYaGhgYGhohISAhIScnJycnJycnJyf/wAARCAAKADQDASIAAhEBAxEB/8QAhAAAAgIDAAAAAAAAAAAAAAAABAYAAwEFBwEBAQEAAAAAAAAAAAAAAAAABQQGEAAABQEDBw0BAAAAAAAAAAAAAQIDBDIRMUEhURIiQgUG8GGBsWKCIzMUJDQVNRYRAAAEAggHAQAAAAAAAAAAAAABERJhEyExUXGBIqIEQaHR0iMzJAX/2gAMAwEAAhEDEQA/AOxcQztBBQmz1laznMWBBbBm9f0ZF9W1yuAYW2jJRMxvBW6fNN+FwP3RBObKIlF4Tes4fUXSGqbKbgxVyHMiUFkLOeBDWcNfFdurwvuxFPF3wmqq8Ke8I9/MdwRMot/Ok0PVHE9K0gFKQ+5KfckOHatwzMxWlKlqJCStUo7CIsTMYB25v041Ne1cADrzW0jdEjCloiZbIYBk/n0/S+ms9z5ul28wgYRBb4dHLqAvvj79faP/2Q==');
            background-repeat: repeat-x;
            background-size: 50px 10px; 
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
