console.log('ok vue');
import Vue from 'vue'

import app from './components/App.vue'

    
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import router from './router.js'

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

import '../node_modules/bootstrap/dist/css/bootstrap.css'

import './css/global.css'

var vm = new Vue({
    el: '.box',
    render: c => c(app),
    router: router,
});