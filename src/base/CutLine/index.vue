<template>
    <section class="sp-line">
        <div class="line-r"></div>
        <div class="line-content">{{content}}</div>
        <div class="line-r"></div>
    </section>
</template>

<script>

export default {
    data () {
        return {}
    },
    props: ['content'],
    methods: {

    }
}
</script>

<style scoped lang="scss">
    .sp-line {
        height: 62px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;
        .line-r {
            width: 100px;
            height: 30px;
            border-bottom: 2px solid #c9c9c9;
        }
        .line-content {
            font-size: 24px;
            margin-left: 10px;
            margin-right: 10px;
            color: #000;
            line-height: 62px;
        }
    }
</style>
