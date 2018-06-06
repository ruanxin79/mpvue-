<template>
    <section class="banner-cont">
        <swiper indicator-dots circular indicator-active-color="#fff">
            <swiper-item v-for="item in data" :key="item.id">
                <img :src="item.image" class="slide-image" />
            </swiper-item>
        </swiper>
    </section>  
</template>

<script>

export default {
    data () {
        return {

        }
    },
    props: ['data'],
    methods: {

    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .banner-cont {
        height: 370px;
        width: 100%;         
    }
    .slide-image {
        height: 370px;
        width: 100%;            
    }
    swiper {
        height:370px;
    }
 
</style>
