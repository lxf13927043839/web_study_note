// 项目的入口文件

// 导入 vue
import Vue from 'vue';

// 导入app.vue
import app from './components/App.vue';

// 设置底部导航栏的前端路由
import VueRouter from 'vue-router';
Vue.use(VueRouter); 
import router from './router';

// 导入全局import配置
import './globalConfig.js'

// 导入过滤器的配置
import './fliters'

var vm = new Vue({
    el: '.box',
    render: c => c(app),
    router: router,
});