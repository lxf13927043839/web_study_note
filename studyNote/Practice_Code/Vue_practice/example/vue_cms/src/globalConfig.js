// 导入 vue
import Vue from 'vue';


// 使用mint-ui做的头部，按需导入,需要注意的是，样式文件需要单独引入。
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

import 'mint-ui/lib/style.css';


import { Lazyload } from 'mint-ui';
Vue.use(Lazyload, {
    // loading: './images/loading.gif',
});

import { Button } from 'mint-ui';
Vue.component(Button.name, Button);

// mui底部导航栏
import './lib/mui-3.7.1/dist/css/mui.css'
import './lib/mui-3.7.1/dist/css/icons-extra.css'

//导入轮播图组件
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


// 导入axios
import axios from 'axios';
Vue.prototype.$http = axios.create({
    baseURL: 'http://api.cms.liulongbin.top/',
});


// 全局注册评论子组件
import comment from './components/sub_components/Comment.vue';
Vue.component('comment', comment);

// 导入预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);