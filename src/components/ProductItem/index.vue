<template>
    <div class="product-item">
    	<img :src="data.thumb" class="product-img">
    	<div class="product-info">
    		<div class="title">
                <p class="product-name">{{data.product_name}}</p>
    			<p class="sale-one">{{data.sale_point_one}}</p>
    		</div>
    		<div class="other-sale-point">
    			<p v-for="item in data.other_sale_point" :key="item.key">{{item.name}}</p>
    		</div>
    		<p class="price">￥{{data.package_price}}  <span class="del-price">￥{{data.package_original_price}}</span></p>

    	</div>
    </div>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['data'],
    methods: {

    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .product-item {
    	display: flex;
    	flex-direction: row;
    	align-items: center;
    	width: 100%;
    	height: 250px;
    	margin-bottom: 2px;
    	background-color: #fff;
    	.product-img {
    		width: 280px;
    		height: 160px;
    		margin-left: 16px;
    	}
    	.product-info {
	    	display: flex;
	    	flex-direction: column;    		
    		height: 190px;
    		margin-left: 16px;
    		.title {
    			font-size: 26px;
    			font-weight: 400;
    			p {
    				width: 402px;
    				line-height: 42px;
    			}
                .sale-one {
                    font-size: 22px;

                    line-height: 36px;

                    color:#999;
                    
                    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

                    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

                    -webkit-line-clamp: 2; /** 显示的行数 **/

                    overflow: hidden;  /** 隐藏超出的内容 **/
                }

                .product-name {


                    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/

                    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/

                    -webkit-line-clamp: 2; /** 显示的行数 **/

                    overflow: hidden;  /** 隐藏超出的内容 **/                    
                }
    		}
    		.other-sale-point {
    			width: 402px;
    			display: flex;
    			flex-direction: row;  
    			flex-wrap: wrap;
    			margin-left: -16px;
    			line-height: 34px;
    			p {
    				margin-left: 16px;
    				color: #6f6f6f;
    				font-size: 20px;
    			}

    		}
    		.price {
    			color: $red;
    			font-weight: 400;
    			font-size: 22px; 
                .del-price {
                    text-decoration:line-through;
                    color: #999;
                    font-size: 20px;
                    padding-left: 10px;
                }
    		}
    	}
    }
</style>
