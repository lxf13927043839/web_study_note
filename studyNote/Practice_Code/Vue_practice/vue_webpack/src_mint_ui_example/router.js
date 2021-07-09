import VueRouter from 'vue-router';

// 这是单文件组件
import Login from './components/account/Login.vue'
import Reg from './components/account/Reg.vue'
// app不是路由，所有这里不是嵌套路由,它们是单文件组件
var router = new VueRouter({
    routes: [
        {path: '/', redirect: 'Login'},
        {path: '/Login', component: Login},
        {path: '/Reg', component: Reg},
    ],
});
console.log('GOGOGO');

export default router;