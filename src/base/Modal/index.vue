<template>
    <section class="under-bg" v-if="show">
        <slot></slot>
    </section>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['content', 'show'],
    methods: {

    }
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .under-bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.2);
        z-index: 200;
    }
</style>
