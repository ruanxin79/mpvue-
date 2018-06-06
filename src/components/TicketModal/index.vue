<template>
    <div class="under-back">
        <div class="modal-container" >
            <div class="inner">
                <radio-group class="radio-group" @change="radioChange">
                    <div v-for="item in babels" :key="item.name" class="line">
                        <label class="radio">
                            <radio :value="item.value" :checked="item.checked" color="#ab9568"/> {{item.name}}
                        </label>                    
                    </div>

                </radio-group>    
                <div class="input-line">
                    <div class="title">抬头</div>
                    <input type="text" class="input-item" :placeholder="headPlaceholder" v-model="headValue"/>
                </div>   
                <div class="input-line" v-if="companyVisible">
                    <div class="title">税号</div>
                    <input type="number" class="input-item" placeholder="请输入税号" v-model="taxValue"/>
                </div>            
            </div>
            <div class="confirm-btn" @click="comfirm">确定</div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            headPlaceholder: '请输入个人姓名',
            companyVisible: false,
            taxValue: '',
            headValue: ''
        }
    },
    props: ['babels', 'initHeadValue', 'initTaxValue'],
    methods: {
        radioChange (e) {
            this.headValue = "";
            if (e.mp.detail.value === '0') {
                this.headPlaceholder = "请输入个人姓名";
                this.companyVisible = false;
                this.babels[0].checked = true;
                this.babels[1].checked = false;
            }
            else {
                this.headPlaceholder = "请输入公司名称" ;
                this.companyVisible = true;
                this.babels[1].checked = true;
                this.babels[0].checked = false;                
            }
        },
        comfirm () {
            this.$emit('getTicketInfo', this.babels, this.headValue, this.taxValue)
        }
    },
    mounted () {
        console.log(this.initHeadValue, this.initTaxValue)
        this.headValue = this.initHeadValue;
        this.taxValue = this.initTaxValue;
        this.companyVisible = this.babels[1].checked
    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .under-back {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background-color: rgba(0,0,0,0.2);
        .modal-container {
            width: 600px;
            height: 460px;
            position: absolute;
            left: 50%;
            margin-left: -300px;
            top: 300px;
            background-color: #fff;
            border-radius: 10px;
            .inner {
                padding: 40px;
                .line {
                    radio {
                        transform: scale(0.7); 
                    }
                    .radio {
                        font-size: 26px;
                    }                
                }
                .input-line {
                    display: flex;
                    flex-direction: row;
                    margin-top: 20px;
                    .title {
                        width: 80px;
                        height: 60px;
                        line-height: 60px;
                        font-size: 24px;
                        text-align: center;
                    }
                    .input-item {
                        width: 400px;
                        height: 20px;
                        line-height: 20px;
                        font-size: 22px;
                        border: 1px solid #000;
                    }
                }
            }


            .confirm-btn {
                width: 100%;
                height: 80px;
                line-height:80px;
                font-size: 26px;
                color: #fff;
                text-align: center;
                background-color: $yellow;
                position: absolute;
                left: 0;
                bottom: 0;
            }
        }
    }

</style>
