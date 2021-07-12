<template>
    <div>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in imgSrc" :key="item.id">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <!-- 注意imgname在传递的时候要使用字符串 -->
        <swiper :imgSrc="imgSrc" :imgname="'img'" :isfull="true"></swiper>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news">
                    <img src="../../images/menu1.png">
                    <div class="mui-media-body">新闻资讯</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photoshare">
                    <img src="../../images/menu2.png">
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png">
                    <div class="mui-media-body">联系我们</div></a></li>
        </ul> 
    </div>
</template>

<script>
// 1、导入轮播图组件
import swiper from '../sub_components/Swiper.vue';

// 一个组件就是一个vue实例
export default {
    data: function () {
        return {
            imgSrc: [],
        }
    },
    created() {
        this.getImg();
    },
    methods: {
        async getImg() {
            const { data } =await this.$http.get('/api/getlunbo');
            // console.log(data);
            this.imgSrc = data.message;
        }
    },
    // 2、注册私有组件
    components: {
        swiper: swiper,
    },
}

</script>

<style lang="less" scoped>
    // .mint-swipe {
    //     // 宽度会同比例缩放，180刚好是整个宽度
    //     height: 180px;
    //     img {
    //         width: 100%;
    //         height: 100%;   
    //     }
    // }
    // 九宫格
    .mui-grid-view {
        img {
            width: 60px;
            height: 60px;
        }
    }
    .mui-grid-view.mui-grid-9 {
        border: none;
        background-color: #fff;
    } 
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }
</style>