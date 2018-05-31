<template>
    <div class="product-item">
    	<img :src="data.thumb" class="product-img">
    	<div class="product-info">
    		<div class="title">
    			<p class="sale-one">{{data.sale_point_one}}</p>
    			<p class="product-name">{{data.product_name}}</p>
    		</div>
    		<div class="other-sale-point">
    			<p v-for="item in data.other_sale_point" :key="item.key">{{item.name}}</p>
    		</div>
    		<p class="price">￥{{data.price}}</p>
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
    				word-wrap: break-word;
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
    		}
    	}
    }
</style>
