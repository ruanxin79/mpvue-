<template>
    <div class="container">
        我是首页
        {{count}}
        <div class="btn-area">
          <button @click="add">加一</button>
        </div>

    </div>

</template>

<script>

import store from '../../store'

import {setPageTitle} from '../../utils/wx'

import {getTreeNode} from '../../utils/api' 

export default {
    data () {
        return {
            
        }
    },
    computed: {
        count () {
            return store.state.count
        }
    },
    methods: {
        getUserInfo () {
            store.dispach('getUserInfo')
        },
        init () {
            setPageTitle('想帮帮');
            // this.getUserInfo()
        },
        clickHandle(text, event){
          console.log(text, e)
        },
        add(){
          store.commit('INIT_PAGE', {count: ++this.count})

          request('http://aaa.com.cn','get',{a: 1, b: 2})
        }
    },
    created () {
     // request('http://testscanadmin.lenovo.com.cn/index.php/Scanadmin/Product/productTree', 'get', {treeid: 0})
        this.init()

        getTreeNode('/Product/productTree', 'get', {treeid: 0}).then((res) =>{
            console.log(res)
        })

        // fly.get("http://testscanadmin.lenovo.com.cn/index.php/Scanadmin/Product/productTree",{treeid: 0}).then((res)=>{
        //   console.log(res)
        // })
    }
}
</script>

<style scoped lang="scss">
    .container {
        .btn-area {
            color: red;
        }
    }
</style>
