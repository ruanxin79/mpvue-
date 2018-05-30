<template>
    <div class="container">
        <div class="main">
            <scroll-view scroll-y class="inner" 
            @scrolltolower="lower"
            lower-threshold="50">
                <div class="title">
                    <h5>
                        我的订单
                        <span>共 {{num}} 单</span>
                    </h5>
                    <ul class="title-item">
                        <li @click="changeTitle(0)"><span class="icon icon-doc-text"></span><span>全部</span></li>
                        <li @click="changeTitle(1)"><span class="icon icon-wallet"></span><span>待付款</span><i v-if="orderList.payOrder">{{orderList.payOrder}}</i></li>
                        <li @click="changeTitle(2)"><span class="icon icon-gift"></span><span>待发货</span><i v-if="orderList.deliverOrder">{{orderList.deliverOrder}}</i></li>
                        <li @click="changeTitle(3)"><span class="icon icon-truck"></span><span>待收货</span><i v-if="orderList.collectOrder">{{orderList.collectOrder}}</i></li>
                    </ul>
                </div>
                <ProductInfo 
                :data="orderList" 
                :productStyle="productStyle" 
                :type="status"
                @showModal="showModal"></ProductInfo>
                <div class="noOrder" v-if="orderList.length == 0">{{noOrderText}}</div>
                <div class="load-more" v-if="loadMore">{{loadMoreText}}</div>
            </scroll-view>
        </div> 
        <PayModal 
            :isShowModal="isShowPayModal"
            @hideModal="payModalCancel"
            @getOrderList='init'>
        </PayModal>
    </div>
</template>

<script>

import store from '../../store'

import {setPageTitle,GetOrderList} from '../../utils/wx'

import ProductInfo from "../../components/productInfo"
import PayModal from '../../components/PayModal'
const mockData = {
    "status_code":200,
    "message":"success",
    "data":{
        "orderList":[
            {
                "code":"2017061221551551565352",
                "id":2132,
                "original_total":"30.14",
                "total":"0.00",
                "status":1,
                "computer":[
                    {
                        "id":1187,
                        "order_id":2132,
                        "product_id":2,
                        "product_type":"computer",
                        "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                        "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                        "product_price":"0.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0
                    },
                    {
                        "id":2130,
                        "order_id":2132,
                        "product_id":52,
                        "product_type":"computer",
                        "product_full_name":"是否看见对方",
                        "product_abbreviation":"是非得失v",
                        "product_price":"0.01",
                        "supplier_name":"联想（北京）有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0,
                        "gift":[
                            {
                                "id":2142,
                                "order_id":2132,
                                "product_id":2,
                                "product_type":"gift",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2144,
                                "order_id":2132,
                                "product_id":4,
                                "product_type":"gift",
                                "product_full_name":"赠品1",
                                "product_abbreviation":"赠品",
                                "product_price":"20.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2136,
                                "order_id":2132,
                                "product_id":30,
                                "product_type":"gift",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"9999.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2143,
                                "order_id":2132,
                                "product_id":31,
                                "product_type":"gift",
                                "product_full_name":"服务描述-测试上架下架",
                                "product_abbreviation":"服务",
                                "product_price":"88.88",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2131,
                                "order_id":2132,
                                "product_id":32,
                                "product_type":"gift",
                                "product_full_name":"张林均测试",
                                "product_abbreviation":"测试zlj",
                                "product_price":"10.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2137,
                                "order_id":2132,
                                "product_id":33,
                                "product_type":"gift",
                                "product_full_name":"测试配件是否能购买",
                                "product_abbreviation":"测试配件是否能购买",
                                "product_price":"0.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2141,
                                "order_id":2132,
                                "product_id":34,
                                "product_type":"gift",
                                "product_full_name":"私人定制",
                                "product_abbreviation":"私人定制",
                                "product_price":"499.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2138,
                                "order_id":2132,
                                "product_id":41,
                                "product_type":"gift",
                                "product_full_name":"电脑周边",
                                "product_abbreviation":"电脑周边",
                                "product_price":"1000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2139,
                                "order_id":2132,
                                "product_id":42,
                                "product_type":"gift",
                                "product_full_name":"笔记本",
                                "product_abbreviation":"本本",
                                "product_price":"5000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2140,
                                "order_id":2132,
                                "product_id":46,
                                "product_type":"gift",
                                "product_full_name":"周边测试",
                                "product_abbreviation":"测试1",
                                "product_price":"123.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2135,
                                "order_id":2132,
                                "product_id":49,
                                "product_type":"gift",
                                "product_full_name":"配件",
                                "product_abbreviation":"配件",
                                "product_price":"10.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2132,
                                "order_id":2132,
                                "product_id":50,
                                "product_type":"gift",
                                "product_full_name":"成为空间发的",
                                "product_abbreviation":"爽肤水",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2133,
                                "order_id":2132,
                                "product_id":51,
                                "product_type":"gift",
                                "product_full_name":"能否迪士尼",
                                "product_abbreviation":"梵蒂冈",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2134,
                                "order_id":2132,
                                "product_id":54,
                                "product_type":"gift",
                                "product_full_name":"全额无若",
                                "product_abbreviation":"切勿特太容易更换",
                                "product_price":"12.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            }
                        ],
                        "part":[
                            {
                                "id":2148,
                                "order_id":2132,
                                "product_id":2,
                                "product_type":"part",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2147,
                                "order_id":2132,
                                "product_id":49,
                                "product_type":"part",
                                "product_full_name":"配件",
                                "product_abbreviation":"配件",
                                "product_price":"10.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2145,
                                "order_id":2132,
                                "product_id":50,
                                "product_type":"part",
                                "product_full_name":"成为空间发的",
                                "product_abbreviation":"爽肤水",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            },
                            {
                                "id":2146,
                                "order_id":2132,
                                "product_id":51,
                                "product_type":"part",
                                "product_full_name":"能否迪士尼",
                                "product_abbreviation":"梵蒂冈",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2130
                            }
                        ]
                    }
                ]
            },
            {
                "code":"2017061222013951555510",
                "id":2133,
                "original_total":"0.01",
                "total":"0.00",
                "status":3,
                "computer":[
                    {
                        "id":2149,
                        "order_id":2133,
                        "product_id":52,
                        "product_type":"computer",
                        "product_full_name":"是否看见对方",
                        "product_abbreviation":"是非得失v",
                        "product_price":"0.01",
                        "supplier_name":"联想（北京）有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0,
                        "gift":[
                            {
                                "id":2161,
                                "order_id":2133,
                                "product_id":2,
                                "product_type":"gift",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2163,
                                "order_id":2133,
                                "product_id":4,
                                "product_type":"gift",
                                "product_full_name":"赠品1",
                                "product_abbreviation":"赠品",
                                "product_price":"20.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2155,
                                "order_id":2133,
                                "product_id":30,
                                "product_type":"gift",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"9999.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2162,
                                "order_id":2133,
                                "product_id":31,
                                "product_type":"gift",
                                "product_full_name":"服务描述-测试上架下架",
                                "product_abbreviation":"服务",
                                "product_price":"88.88",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2150,
                                "order_id":2133,
                                "product_id":32,
                                "product_type":"gift",
                                "product_full_name":"张林均测试",
                                "product_abbreviation":"测试zlj",
                                "product_price":"10.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2156,
                                "order_id":2133,
                                "product_id":33,
                                "product_type":"gift",
                                "product_full_name":"测试配件是否能购买",
                                "product_abbreviation":"测试配件是否能购买",
                                "product_price":"0.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2160,
                                "order_id":2133,
                                "product_id":34,
                                "product_type":"gift",
                                "product_full_name":"私人定制",
                                "product_abbreviation":"私人定制",
                                "product_price":"499.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2157,
                                "order_id":2133,
                                "product_id":41,
                                "product_type":"gift",
                                "product_full_name":"电脑周边",
                                "product_abbreviation":"电脑周边",
                                "product_price":"1000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2158,
                                "order_id":2133,
                                "product_id":42,
                                "product_type":"gift",
                                "product_full_name":"笔记本",
                                "product_abbreviation":"本本",
                                "product_price":"5000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2159,
                                "order_id":2133,
                                "product_id":46,
                                "product_type":"gift",
                                "product_full_name":"周边测试",
                                "product_abbreviation":"测试1",
                                "product_price":"123.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2154,
                                "order_id":2133,
                                "product_id":49,
                                "product_type":"gift",
                                "product_full_name":"配件",
                                "product_abbreviation":"配件",
                                "product_price":"10.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2151,
                                "order_id":2133,
                                "product_id":50,
                                "product_type":"gift",
                                "product_full_name":"成为空间发的",
                                "product_abbreviation":"爽肤水",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2152,
                                "order_id":2133,
                                "product_id":51,
                                "product_type":"gift",
                                "product_full_name":"能否迪士尼",
                                "product_abbreviation":"梵蒂冈",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            },
                            {
                                "id":2153,
                                "order_id":2133,
                                "product_id":54,
                                "product_type":"gift",
                                "product_full_name":"全额无若",
                                "product_abbreviation":"切勿特太容易更换",
                                "product_price":"12.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2149
                            }
                        ]
                    }
                ]
            },
            {
                "code":"2017061222111551995498",
                "id":2134,
                "original_total":"0.01",
                "total":"0.00",
                "status":2,
                "computer":[
                    {
                        "id":2164,
                        "order_id":2134,
                        "product_id":52,
                        "product_type":"computer",
                        "product_full_name":"是否看见对方",
                        "product_abbreviation":"是非得失v",
                        "product_price":"0.01",
                        "supplier_name":"联想（北京）有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0,
                        "gift":[
                            {
                                "id":2176,
                                "order_id":2134,
                                "product_id":2,
                                "product_type":"gift",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2178,
                                "order_id":2134,
                                "product_id":4,
                                "product_type":"gift",
                                "product_full_name":"赠品1",
                                "product_abbreviation":"赠品",
                                "product_price":"20.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2170,
                                "order_id":2134,
                                "product_id":30,
                                "product_type":"gift",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"9999.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2177,
                                "order_id":2134,
                                "product_id":31,
                                "product_type":"gift",
                                "product_full_name":"服务描述-测试上架下架",
                                "product_abbreviation":"服务",
                                "product_price":"88.88",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2165,
                                "order_id":2134,
                                "product_id":32,
                                "product_type":"gift",
                                "product_full_name":"张林均测试",
                                "product_abbreviation":"测试zlj",
                                "product_price":"10.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2171,
                                "order_id":2134,
                                "product_id":33,
                                "product_type":"gift",
                                "product_full_name":"测试配件是否能购买",
                                "product_abbreviation":"测试配件是否能购买",
                                "product_price":"0.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2175,
                                "order_id":2134,
                                "product_id":34,
                                "product_type":"gift",
                                "product_full_name":"私人定制",
                                "product_abbreviation":"私人定制",
                                "product_price":"499.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2172,
                                "order_id":2134,
                                "product_id":41,
                                "product_type":"gift",
                                "product_full_name":"电脑周边",
                                "product_abbreviation":"电脑周边",
                                "product_price":"1000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2173,
                                "order_id":2134,
                                "product_id":42,
                                "product_type":"gift",
                                "product_full_name":"笔记本",
                                "product_abbreviation":"本本",
                                "product_price":"5000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2174,
                                "order_id":2134,
                                "product_id":46,
                                "product_type":"gift",
                                "product_full_name":"周边测试",
                                "product_abbreviation":"测试1",
                                "product_price":"123.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2169,
                                "order_id":2134,
                                "product_id":49,
                                "product_type":"gift",
                                "product_full_name":"配件",
                                "product_abbreviation":"配件",
                                "product_price":"10.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2166,
                                "order_id":2134,
                                "product_id":50,
                                "product_type":"gift",
                                "product_full_name":"成为空间发的",
                                "product_abbreviation":"爽肤水",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2167,
                                "order_id":2134,
                                "product_id":51,
                                "product_type":"gift",
                                "product_full_name":"能否迪士尼",
                                "product_abbreviation":"梵蒂冈",
                                "product_price":"0.01",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            },
                            {
                                "id":2168,
                                "order_id":2134,
                                "product_id":54,
                                "product_type":"gift",
                                "product_full_name":"全额无若",
                                "product_abbreviation":"切勿特太容易更换",
                                "product_price":"12.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2164
                            }
                        ]
                    }
                ]
            },
            {
                "code":"2017061015135955489855",
                "id":2127,
                "original_total":"0.1",
                "total":"0.00",
                "status":2,
                "computer":[
                    {
                        "id":2076,
                        "order_id":2127,
                        "product_id":48,
                        "product_type":"computer",
                        "product_full_name":"张林均测试",
                        "product_abbreviation":"张林均测试Bug",
                        "product_price":"0.10",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0
                    }
                ]
            },
            {
                "code":"2017060516411497100511",
                "id":2118,
                "original_total":"20383.1",
                "total":"20383.10",
                "status":4,
                "computer":[
                    {
                        "id":2026,
                        "order_id":2118,
                        "product_id":36,
                        "product_type":"computer",
                        "product_full_name":"Lenovo",
                        "product_abbreviation":"Lenovo1",
                        "product_price":"256.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0,
                        "gift":[
                            {
                                "id":2027,
                                "order_id":2118,
                                "product_id":2,
                                "product_type":"gift",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2026
                            },
                            {
                                "id":2028,
                                "order_id":2118,
                                "product_id":30,
                                "product_type":"gift",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"9999.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2026
                            }
                        ],
                        "part":[
                            {
                                "id":2029,
                                "order_id":2118,
                                "product_id":2,
                                "product_type":"part",
                                "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                                "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                                "product_price":"20.11",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2026
                            },
                            {
                                "id":2031,
                                "order_id":2118,
                                "product_id":30,
                                "product_type":"part",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"9999.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2026
                            },
                            {
                                "id":2030,
                                "order_id":2118,
                                "product_id":33,
                                "product_type":"part",
                                "product_full_name":"测试配件是否能购买",
                                "product_abbreviation":"测试配件是否能购买",
                                "product_price":"0.00",
                                "supplier_name":"北京高清科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":2026
                            }
                        ]
                    }
                ]
            },
            {
                "code":"2016122217340398485598",
                "id":1906,
                "original_total":"1",
                "total":"0",
                "status":2,
                "computer":[
                    {
                        "id":1202,
                        "order_id":1906,
                        "product_id":28,
                        "product_type":"computer",
                        "product_full_name":"测试热门机型顺序2",
                        "product_abbreviation":"测试热门机型顺序2",
                        "product_price":"1.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0
                    }
                ]
            },
            {
                "code":"2016122210261151101995",
                "id":1895,
                "original_total":"0",
                "total":"0",
                "status":2,
                "computer":[
                    {
                        "id":1191,
                        "order_id":1895,
                        "product_id":2,
                        "product_type":"computer",
                        "product_full_name":"ThinkPad X260 (20F6A05FCD)12.5英寸超薄笔记本电脑(I5-6200U 8G 256GSSD Win7 )",
                        "product_abbreviation":"[配件]12.5英寸超薄笔记本",
                        "product_price":"0.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0
                    }
                ]
            },
            {
                "code":"2016121014484157575210",
                "id":44,
                "original_total":"1",
                "total":"1",
                "status":4,
                "computer":[
                    {
                        "id":1168,
                        "order_id":44,
                        "product_id":29,
                        "product_type":"computer",
                        "product_full_name":"测试热门机型顺序4",
                        "product_abbreviation":"测试热门机型顺序4",
                        "product_price":"1.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0
                    }
                ]
            },
            {
                "code":"2016120810170549525299",
                "id":41,
                "original_total":"10060",
                "total":"10060",
                "status":2,
                "computer":[
                    {
                        "id":1161,
                        "order_id":41,
                        "product_id":1,
                        "product_type":"computer",
                        "product_full_name":"配件11111222",
                        "product_abbreviation":"配件1asas</br>",
                        "product_price":"20.00",
                        "supplier_name":"北京龙企华商科技有限公司",
                        "product_thumb":"/a/b/c/d",
                        "product_pid":0,
                        "service":[
                            {
                                "id":1158,
                                "order_id":41,
                                "product_id":5,
                                "product_type":"service",
                                "product_full_name":"服务2",
                                "product_abbreviation":"服务2",
                                "product_price":"30.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":1161
                            }
                        ],
                        "part":[
                            {
                                "id":1160,
                                "order_id":41,
                                "product_id":30,
                                "product_type":"part",
                                "product_full_name":"测试热门机型顺序3-newnew",
                                "product_abbreviation":"测试热门机型顺序3-new",
                                "product_price":"10000.00",
                                "supplier_name":"北京龙企华商科技有限公司",
                                "product_thumb":"/a/b/c/d",
                                "product_pid":1161
                            }
                        ]
                    }
                ]
            }
        ],
        "payOrder":0,
        "deliverOrder":4,
        "collectOrder":2,
        "successOrder":3
    }
}

export default {
    data () {
        return {
            num: '',
            loadMore: false,
            loadMoreText: '没有更多订单',
            noOrderText: '您还没有相关订单，去智享生活商城看看吧~',
            productStyle: 'myOrder',
            status: 0,
            orderList: [],
            isShowPayModal: false
        }
    },
    components: {
       ProductInfo,
       PayModal
    },
    watch: {
        orderList () {},
    },
    methods: {
        /* 初始化 */
        init () {
            setPageTitle('我的订单');
            wx.showLoading({
                title: '加载中',
            })
            setTimeout(() => {
                wx.hideLoading()
                this.getOrderList(1);
            }, 1000);
            
        },
        /* 获取订单列表 */
        getOrderList (pageNum) {
           // 订单的状态（1待付款；2已付款；3已发货；如果status=0 则是全部订单）
            let _para = {
                openid: 'oLHCTjpIGYEjkzj7ckIWLXifV1Yk',
                status: 0,
                index: 100,
                page: 1
            };
            this.orderList =  mockData.data ;
            this.num = mockData.data.orderList.length;
            this.loadMore = true;
            // TODO
        },
        changeTitle (state) {
           this.status = state;
        },
        lower (e) {
            console.log('上拉加载')
            if(!this.loadMore) {
                wx.showLoading({
                    title: '加载中',
                    duration: 2000
                })
            }
        },
        showModal () {
            this.isShowPayModal = true;
        },
        payModalCancel () {
            this.isShowPayModal = false
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

        .inner {
            width: 100%;
            height: 100%;
        }

        .title {
            background-color: #ffffff;
            font-size: $font-size;
            padding: 0 $padding-x; 
            margin-top: 10px;
            h5 {
                border-bottom: 1px solid $under-background; 
                line-height: 85px;
                font-weight: 800;
                span {
                    float: right;
                    color: $color;
                    font-weight: normal;
                }
            }
            ul {
                display: flex;
                text-align: center;
                padding-top: 16px;
                li {
                    flex: 1;
                    min-height: 130px;
                    padding: 25px 0;
                    position: relative;
                }
                li img {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto;
                    background-color: $under-background;
                }
                li .icon {
                    font-size: 60px;
                }
                li span {
                    padding: 10px 0;
                    display: block;
                }
                li i {
                    color: #ffffff;
                    background-color: $red;
                    position: absolute;
                    transform: scale(.8);
                    top: 10px;
                    right: 12px;
                    min-width: 50px;
                    height: 50px;
                    line-height: 50px;
                    padding: 5px;
                    text-align: center;
                    border-radius: 50%;
                }
            }
        }

        .load-more {
            padding: 20px 0;
            text-align: center;
            font-size: 22px;
            color: #999999;
        }
        .noOrder {
            color: #999999;
            font-size: 22px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -25%;
        }
        
    }

</style>
