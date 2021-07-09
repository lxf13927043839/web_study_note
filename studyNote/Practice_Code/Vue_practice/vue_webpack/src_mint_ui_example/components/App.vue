
<template>
    <div>
        <h3>我是.vue文件中的组件</h3>
        <mt-button type="danger" @click="show" icon="back" size="large">danger</mt-button>
        <router-link to="/Login">登录</router-link>
        <router-link to="/Reg">注册</router-link>

        <router-view></router-view>  
    </div>
</template>

<script>
// 放在脚本标签里边，这是一个独立单文件组件，不引入的话，Toast是未定义的
import { Toast } from 'mint-ui';
export default {
    name: 'WorkspaceJsonApp',
    components: {  },
    directives: {  },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        show() {
            Toast({
                message: '提示',
                position: 'bottom',
                duration: -1,
                iconClass: 'glyphicon glyphicon-flag flag-color'
            });
        }
    },
};
</script>

<style scoped>
    h3 {
        color: orange;
    }
    div {
        border: 1px solid royalblue;
    }

</style>