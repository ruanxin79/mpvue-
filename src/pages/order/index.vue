<template>
    <div class="container">
        <div class="main">
            <scroll-view class="inner" scroll-y="true">
                <section class="form-container">
                    <div class="f-item">
                        <div class="title">配送信息</div>
                    </div>
                    <div class="f-item">
                        <div class="f-title">收货人: </div>
                        <div class="f-input">
                        	<input type="text" class="cont" v-model="consignee" />
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="f-title">联系电话: </div>
                        <div class="f-input">
                        	<input type="number" class="cont" v-model="telephone"/>
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="f-title">所在地区: </div>
                
                        <picker mode="region" @change="bindRegionChange" :value="region" customItem='全部' class="f-input">
                            <div class="picker">
                                <span class="region">{{region[0]}}</span>
                                <span class="region">{{region[1]}}</span>
                                <span class="region">{{region[2]}}</span>
                                <span class="arror-cont"></span>
                                
                            </div>
                        </picker>      
                        <span class="narrow"></span>                          
                    </div>
                    <div class="f-item">
                        <div class="f-title">详细地址: </div>
                        <div class="f-input">
                        	<input type="text" class="cont" v-model="detailAddress"/>
                        </div>
                    </div>
                </section>
                <section class="product-item">
                    <img :src="productDetail.thumb" class="product-img">
                    <div class="product-info">
                        <div class="title">
                            <p class="sale-one">{{productDetail.full_name}}</p>
                        </div>
                        <p class="price">￥{{productDetail.package_price}}</p>
                    </div>
                </section>
                <section class="label-cont">
                    <Label></Label>
                </section>
                <section class="sale-cont" v-if="productDetail.gifts && productDetail.gifts.length>0">
                    <ul class="parts-content">
                        <li class="parts-content-item" v-for="item in productDetail.gifts" :key="item.id">
                            <div class="name">{{item.abbreviation}}</div>
                            <div class="price">￥{{item.price}}</div>
                        </li>
                    </ul>
                </section>
                <section class="ticket-btn" @click="openTicketModal">
                    <div class="title">发票信息</div>
                    <div class="info">
	                    <div class="type">{{ticketType == 0 ? "个人信息" : "公司"}} - 商品明细</div>
	                    <div class="arrow"></div>
                    </div>
                </section>
                <section class="remark-container">
                	<div class="title">备注</div>
                	<div class="content">
                		<input 
                            type="text" 
                            :placeholder="remarkPlaceholder" 
                            class="input-content" 
                            v-model="remark" 
                            placeholder-class="place-holder"/>
                	</div>
                </section>
                <section class="remark-words">
                	<div class="zhu">注: </div>
                	<ul class="list">
                		<li>1、【7天无条件退货】和【14天无条件换货】时间从签收之日算起</li>
                		<li>2、自卖家发货之日起，14天后交易自动完成</li>
                	</ul>
                </section>                   
            </scroll-view>

        </div>
        <div class="bottom-menu">
            <div class="price-info">
                <div class="content">
                    <div class="title">实付金额:</div>
                    <div class="total-price">
                        <span class="large">￥{{largePrice}}</span>
                        <span class="small">.{{smallPrice}}</span>
                    </div>
                </div>
            </div>
            <div class="sub-btn" @click="submit">提交订单</div> 
        </div>

        <SuccessModal v-if="successModalVisible" @hideModal="hideSuccessModal" :orderCode="orderCode"></SuccessModal>

        <FailModal v-if="failModalVisible" @hideModal="hideFailModal"></FailModal>

        <TicketModal 
            v-if="ticketModalVisible" 
            :babels="tempraryModalData" 
            @getTicketInfo="getTicketInfo"
            :initHeadValue="headValue"
            :initTaxValue="taxValue"
        >
            
        </TicketModal>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import {createOrder} from '../../utils/api'

import {ParamsValidate} from '../../utils/index'

import Label from '../../components/Label'

import TicketModal from '../../components/TicketModal'

import SuccessModal from '../../components/SuccessModal'

import FailModal from '../../components/FailModal'

//const MD5 = require('md5')
export default {
    data () {
        return {
            region: ['', '', ''],
            remarkPlaceholder: "请根据您的需要进行填写，下单后会有客服人员联系您进行确认",
            visible: false,
            consignee: '',
            telephone: '',
            detailAddress: "",
            remark: "",
            successModalVisible: false,
            failModalVisible: false,
            ticketModalVisible: false,
            tempraryModalData: [
                {name: '个人-商品明细', value: '0', checked: true},
                {name: '公司-商品明细', value: '1', checked: false}
            ],
            ticketType: "0",
            headValue: "", 
            taxValue: "",
            orderCode: ''
        }
    },
    components: {
        Label,
        TicketModal,
        SuccessModal,
        FailModal
    },
    computed: {
        productDetail () {
            return store.state.productDetail
        },
        openId () {
            return store.state.openId
        },
        largePrice () {
            return store.state.productDetail.package_price.split('.')[0]
        },
        smallPrice () {
            return store.state.productDetail.package_price.split('.')[1]
        }
    },
    methods: {
        init () {
            setPageTitle('填写订单');
            this.ticketModalVisible = false;
        },
        bindRegionChange (e) {
            let value = e.target.value;
            if (String(value).indexOf('全部') > -1) {
                wx.showModal({
                    title: '提示',
                    content: '请填写完整的地区'
                })                
            }
            else {
                this.region = value
            }
        },
        getTicketInfo (list, headValue, taxValue) {
            let findRes = list.find(item => item.checked === true);
            this.ticketType = findRes.value;
            this.tempraryModalData = list;
            this.headValue = headValue;
            this.taxValue = taxValue;
            this.ticketModalVisible = false;
        },
        submit () {
            let params = {
                openid: this.openId,
                phone: this.telephone,
                address: `${String(this.region)} ${this.detailAddress}`,
                customer: this.consignee,
                remark: this.remark,
                invoice_company: '',
                invoice_sign: '',
                products: [
                    {
                        computer: [
                            this.productDetail.serial_number
                        ]
                    }
                ]
            };


            //判断有无发票
            if (this.ticketType === '0') {
                params.invoice_personal = this.headValue;
            }
            else {
                params.invoice_company = this.headValue;
                params.invoice_sign = this.taxValue;
            }

            //判断有无赠品
            if (this.productDetail.gifts && this.productDetail.gifts.length > 0) {
                params.products[0].gift = this.productDetail.gifts.map(item => item.serial_number);
            }
            
            if (Number(this.productDetail.stock) <= 0) {
                wx.showModal({
                    title: '错误',
                    content: '库存不足了，请大官人再看看别的吧！'
                })                   
            }

            let validater = new ParamsValidate()
            let res = validater.checkUserName(params.customer)
            .checkPhone(params.phone)
            .checkAddress(params.address)


            if (res.result === false) {
                wx.showModal({
                    title: '错误',
                    content: res.errMsg
                })                
                return;
            }


            wx.showLoading({title: "提交中"})
            createOrder(params).then((res) => {
                if (res.status_code === 200) {
                    
                    wx.hideLoading()
                    let data = res.data;
                    this.orderCode = data.code;
                    wx.requestPayment({
                       'timeStamp': String(data.timeStamp),
                       'nonceStr': data.nonceStr,
                       'package': data.package,
                       'signType': 'MD5',
                       'paySign': data.paySign,
                        success: (res) => {
                            this.successModalVisible = true;
                        },
                        fail: (res) => {
                            this.failModalVisible = true; 
                       }
                    })

                }
                else {
                    wx.hideLoading()
                    wx.showModal({
                        title: '错误',
                        content: res.message
                    })   
                }
            }).catch((e) => {
                console.log(e)
            })
        },
        payModalCancel () {
            this.isShowPayModal = false
        },
        hideSuccessModal () {
            this.successModalVisible = false;
        },
        hideFailModal () {
            this.failModalVisible = false;
        },
        openTicketModal () {
            this.ticketModalVisible = true;
        }
    },
    mounted(){
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
            .inner {
            	height: 100%;
            }        
        }
       
        .bottom-menu {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 100px;
            z-index: 10px;
            background-color: #f9f9f9;
            .price-info {
                position: relative;
                display: inline-block;
                width: 480px;
                line-height: 100px;
                height: 100px;
                .title {
                    display: inline-block;
                    margin-left: 240px;
                    font-size: 28px;
                }
                .total-price {
                    display: inline-block;
                    margin-left: 4px;
                    font-size: 24px;
                    color: $red;
                    .large {
                        font-size: 28px;
                    }
                }

            }
            .sub-btn {
                display: inline-block;
                width: 270px;
                line-height: 100px;
                font-size: 36px;
                color: #fff;
                background-color: $yellow;
                text-align: center;
            }
        }

        .form-container {
            padding: 0 20px;
            background-color: #fff;
            margin-top: 20px;
            .f-item {
                position: relative;
                height: 74px;
                line-height: 74px;
                border-top: 2px solid #e0e0e0;
                display: flex;
                flex-direction: row;
                .f-title {
                    width: 130px;
                    height: 74px;
                    line-height: 74px;    
                    vertical-align: middle;
                    font-size: 26px;
                    color: #666;
                }
                .cont {
                    width: 530px;
                    height: 74px;
                    line-height: 74px;
                    border: 0;    
                    font-size: 26px;
                    input {
                    	display: inline-block;
                    	height: 74px;
                    	font-size: 26px; 
                    	vertical-align: middle; 
                    }           
                }
                .title {
                    display: inline-block;
                    height: 74px;    
                    line-height: 74px;   
                    color: #000;  
                    font-size: 26px;             
                }




                .picker {
                    height: 74px;    
                    line-height: 74px;  
                    display: flex;
                    flex-direction: row;                    
                }
                .region {
                    height: 74px;    
                    line-height: 74px;   
                    color: #000;  
                    width: 160px;
                    font-size: 26px;
                    text-align: center;   
                }
                .arror-cont {
                    height: 74px;
                    width: 90px;
                    .arrow {
                        width: 20px;
                        height: 20px;
                        border-top: 2px solid #999;
                        border-right: 2px solid #999;
                        transform: rotate(45deg);
                        position: relative;
                        top:24rpx;
                        left:50rpx;

                    }
                }
            }
        }

        .narrow {
            width: 20px;
            height: 20px;
            border-top: 2px solid #999;
            border-right: 2px solid #999;
            transform: rotate(45deg);
            position: relative;
            top:24rpx;
            right:20rpx;
            z-index: 200;

        }



        .product-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 170px;
            margin-bottom: 2px;
            background-color: #fff;
            margin-top: 20px;
            padding: 20px 0;
            .product-img {
                width: 280px;
                height: 160px;
                margin-left: 16px;
            }
            .product-info {
                display: flex;
                flex-direction: column;         
                height: 170px;
                margin-left: 16px;
                .title {
                    font-size: 26px;
                    font-weight: 400;
                    margin-top: 20px;

                    p {
                        width: 402px;
                        line-height: 42px;
                        word-wrap: break-word;
                    }
                }
                .price {
                    color: $red;
                    font-weight: 400;
                    font-size: 22px; 
                    margin-top: 16px;
                }
            }
        } 

        .label-cont {
            line-height: 24px;
            background-color: #fff;
            padding: 20px;
        }    
        .sale-cont{
            background-color: #fff;
            .parts-content {
                word-wrap: wrap;
                .parts-content-item {
                    display: inline-block;
                    margin-left: 22px;
                    margin-bottom: 10px;
                    width: 336px;
                    height: 46px;
                    line-height: 46px;
                    border-radius: 6px;
                    font-size: 22px;
                    border: 2px solid #999;
                    color: #999;
                    .name {
                        float: left;
                        margin-left: 14px;
                        width: 210px;
                        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

                        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

                        -webkit-line-clamp: 1; /** 显示的行数 **/

                        overflow: hidden;  /** 隐藏超出的内容 **/   
                    }
                    .price {
                        float: right;
                        margin-right: 14px;
                    }
                }
            }              
        }

        .ticket-btn {
        	margin-top: 2px; 
        	line-height: 74px;
        	padding: 0 20px;
        	display: flex;
        	flex-direction: row;
        	background-color: #fff;
        	.title {
        		line-height: 74px;
        		font-size: 26px;
        		width: 140px;
        	}
        	.info {
        		width: 610px;
	        	display: flex;
	        	flex-direction: row;
	        	justify-content: flex-end;
	        	line-height: 74px;
	        	.type {
	        		font-size: 24px;
	        		line-height: 74px;
	        		color: #999;
	        		margin-right: 20px; 
	        	}
	        	.arrow {
                    width: 20px;
                    height: 20px;
                    border-top: 2px solid #999;
                    border-right: 2px solid #999;
                    transform: rotate(45deg);  
                    margin-top: 24px;
                    margin-right: 20px;     		
	        	}
        	}
        }
 		
 		.remark-container {
 			margin-top: 20px;
 			padding: 20px;
 			background-color: #fff;
 			.title {
 				line-height: 70px;
 				font-size: 26px;
 			}
 			.content {
 				line-height: 60px;
 				height: 60px;
 				.input-content {
 					width: 100%;
 					line-height: 60px;
 					border: 1px solid #ddd;
 					font-size: 24px;
 					border-radius: 6px;

 				}
 				.input-content::placeholder {
 					text-decoration: overline;
				    text-indent: 5px;
				    color:#999;
 				}
                .input-content ::-webkit-input-placeholder {
                    text-indent: 5px;
                }
 			}
 		}
 		.remark-words {
 			background-color: #fff;
 			display: flex;	
 			flex-direction: row;
 			padding: 20px;
 			.zhu {
	 			width: 40px;
	 			height: 120px; 		
	 			color: #999;
	 			font-size: 20px;		
 			}
 			.list {
 				width: 660px;
 				height: 120px; 
 				li {
		 			color: #999;
		 			font-size: 20px; 
		 			margin-bottom: 10px;					
 				}
 			}

 		}
        .place-holder {
            color: $red;
        }
    }
</style>
