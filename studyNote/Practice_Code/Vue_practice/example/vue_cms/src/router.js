import VueRouter from 'vue-router';
// 导入路由组件
import home from './components/tabber/Home.vue';
import search from './components/tabber/Search.vue';
import shopcar from './components/tabber/Shopcar.vue';
import vip from './components/tabber/Vip.vue';
import news from './components/news/News.vue';
import newsDetail from './components/news/NewsDetail.vue';
import photoShare from './components/photoShare/PhotoShow.vue';
import photoDetail from './components/photoShare/PhotoDetail.vue';
import goodsList from './components/goods/GoodsList.vue';
import goodsDetail from './components/goods/GoodsDetail.vue'; 
import goodsDesc from './components/goods/GoodDesc.vue';
import goodsComment from './components/goods/GoodsComment.vue';

const router = new VueRouter({
    routes: [
        // 根路径，重定向，注意组件名字加上双引号
        {path: '/', redirect: 'home'},
        {path: '/home', component: home},
        {path: '/search', component: search},
        {path: '/shopcar', component: shopcar},
        {path: '/vip', component: vip},
        {path: '/home/news', component: news},
        // 带参数
        {path: '/home/news/detail/:id', component: newsDetail, props: true},
        {path: '/home/photoshare', component: photoShare},
        {path: '/home/photoshare/photodetail/:id', component: photoDetail, props: true},
        {path: '/home/goodslist', component: goodsList},
        {path: '/home/goodslist/goodsdetail/:id', component: goodsDetail, props: true},
        {path: '/home/goodslist/goodsdetail/goodsdesc/:id', component: goodsDesc, props: true},
        {path: '/home/goodslist/goodsdetail/goodscomment/:id', component: goodsComment, props: true, name: 'goodsComment'},


    ],
    // 手动设置被激活的路由链接的高亮显示。
    linkActiveClass: 'mui-active',
});

export default router;