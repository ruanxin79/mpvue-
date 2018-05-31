<template>
    <ul class="label">
        <li class="label-item">7天</li>
        <li class="label-item">优选</li>
        <li class="label-item">包邮</li>
    </ul> 
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
    .label {
        width: 660px;
        display: inline-block;
        margin-left: -10px;

        .label-item {
            display: inline-block;
            font-size: 24px;
            color: $yellow;
            border: 2px solid $yellow;
            border-radius: 8px;
            padding: 4px;
            margin-left: 10px;
            margin-bottom: 10px;
        }
    }
 
</style>
