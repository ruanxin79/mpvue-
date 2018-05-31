<template>
    <Smodal :show="isShowModal">
        <div class="modal-container">
          
            <div class="confirm-btn">确定</div>
        </div>
    </Smodal>
</template>

<script>
import Smodal from '../../base/Modal'

export default {
    data () {
        return {

        }
    },
    props: ['isShowModal', 'onCancel'],
    components: {Smodal},
    methods: {
        radioChange (e) {
            
        }
    },
    watch: {

    },
}
</script>

<style scoped lang="scss">
    @import "../../common/style/global.scss";
    .modal-container {
        width: 600px;
        min-height: 700px;
        position: absolute;
        z-index: 210;
        left: 75px;
        top: 200px;
        background-color: #fff; 
        .confirm-btn {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 80px;
            line-height: 80px;
            text-align: center;
            color: #fff;
            font-size: 24px;
            background-color: $yellow;
            z-index: 220;
        }

    }

</style>
