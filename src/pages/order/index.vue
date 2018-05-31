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
                        	<input type="text" class="cont" v-model="telephone"/>
                        </div>
                    </div>
                    <div class="f-item">
                        <div class="f-title">所在地区: </div>
                
                        <picker mode="region" @change="bindRegionChange" :value="region" customItem='全部' class="f-input">
                            <div class="picker">
                                <span class="region">{{region[0]}}</span>
                                <span class="region">{{region[1]}}</span>
                                <span class="region">{{region[2]}}</span>
                            </div>
                        </picker>                                
                        <div class="arrow"></div>
                    </div>
                    <div class="f-item">
                        <div class="f-title">详细地址: </div>
                        <div class="f-input">
                        	<input type="text" class="cont" v-model="detailAddress"/>
                        </div>
                    </div>
                </section>
                <section class="product-item">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526321979102&di=d27f54db64fc0ab102ee311c4690a443&imgtype=0&src=http%3A%2F%2F58pic.ooopic.com%2F58pic%2F15%2F69%2F38%2F35558PICqf8.jpg" class="product-img">
                    <div class="product-info">
                        <div class="title">
                            <p class="sale-one">今天天气很哈破今天天气很哈破今天天气很哈破今天</p>
                        </div>
                        <p class="price">￥{{productDetail.price}}</p>
                    </div>
                </section>
                <section class="label-cont">
                    <Label></Label>
                </section>
                <section class="sale-cont" v-if="productDetail.gifts && productDetail.gifts.length>0">
                    <ul class="parts-content">
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                        <li class="parts-content-item">
                            <span class="name">私人定制</span>
                            <span class="price">￥100</span>
                        </li>
                    </ul>
                </section>
                <section class="ticket-btn">
                    <div class="title">发票信息</div>
                    <div class="info">
	                    <div class="type">个人信息 - 商品明细</div>
	                    <div class="arrow"></div>
                    </div>
                </section>
                <section class="remark-container">
                	<div class="title">备注</div>
                	<div class="content">
                		<input type="text" :placeholder="remarkPlaceholder" class="input-content" v-model="remark"/>
                	</div>
                </section>
                <section class="remark-words">
                	<div class="zhu">注: </div>
                	<ul class="list">
                		<li>1、【7天无条件退货】和【14天无条件换货】从签收之日算起</li>
                		<li>2、自卖家发货之日起，14天后交易自动完成</li>
                		<li>3、默认开具个人发票，如需更改发票类型请在下单之后联系在线客服</li>
                	</ul>
                </section>                   
            </scroll-view>

        </div>
        <div class="bottom-menu">
            <div class="price-info"></div>
            <div class="sub-btn" @click="submit">提交订单</div> 
        </div>
        <TicketModal :isShowModal="visible"></TicketModal>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import {createOrder} from '../../utils/api'

import {ParamsValidate} from '../../utils/index'

import Label from '../../components/Label'

import TicketModal from '../../components/TicketModal'

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
            remark: ""
        }
    },
    components: {
        Label,
        TicketModal
    },
    computed: {
        productDetail () {
            return store.state.productDetail
        },
        openId () {
            return store.state.openId
        }
    },
    methods: {
        init () {
            setPageTitle('商品详情');


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
                        computer: this.productDetail.serial_number,
                    }
                ]
            };

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


            createOrder(params).then((res) => {
                if (res.status_code === 200) {
                    let data = res.data;
                    wx.requestPayment({
                       'timeStamp': String(data.timeStamp),
                       'nonceStr': data.nonceStr,
                       'package': data.package,
                       'signType': 'MD5',
                       'paySign': data.paySign,
                       'success': function(res){
                            console.log(res)
                       },
                       'fail': function(res){
                            console.log(res)
                       }
                    })

                }

            }).catch((e) => {
                console.log(e)
            })
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
                display: inline-block;
                width: 480px;
                line-height: 100px;
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





        .product-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            height: 170px;
            margin-bottom: 2px;
            background-color: #fff;
            margin-top: 20px;
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
 					text-decoration:overline;
				    letter-spacing:5px;
				    color:#999;
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
    }
</style>
