<template>
    <div class="goods-detail">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <!-- src -->
                    <swiper :imgSrc="swiperSrc" :imgname="'src'" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ detailContent.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<span><del>￥{{ detailContent.market_price }}</del></span>
                        销售价：<span>￥{{ detailContent.sell_price }}</span>
                    </p>
                    <p>购买数量
                        <!-- 库存量是通过ajax去获取的，需要消耗点时间，因此最开始传递给子组件的是undefined，后来才更新为库存数量，但是子组件已经拿undefined去处理了 -->
                        <numbox :max="detailContent.stock_quantity" @func="getNum"></numbox>
                    </p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToCar">加入购物车</mt-button>
                </div>
            </div>
            
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{ detailContent.goods_no }}</p>
                    <p>库存情况: {{ detailContent.stock_quantity }}</p>
                    <p>上架时间: {{ detailContent.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goodsDesc">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain style="margin-top: 15px;" @click="goodsComment">商品评论</mt-button>
            </div>
        </div>
    <!-- 小球的位置,小球会重复的会显示/消失,所以使用v-show -->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag"></div>
        </transition>
    </div>
</template>

<script>
import swiper from '../sub_components/Swiper.vue';
import numbox from '../sub_components/Numbox.vue';

import { mapMutations } from 'vuex'; 

export default {
    data() {
        return {
            swiperSrc: [],
            detailContent: {},
            ballFlag: false,
            num: 0,
            // 因为子组件传值是需要文本的变化,在numbox挂载的时候，就手动去触发了。最好是这样做。它的初始值我们可能不知道是多少
        };
    },
    created: function () {
        this.getSwiperSrc();
        this.getDetailContent();
    },
    methods: {
        async getSwiperSrc() {
            const { data } = await this.$http.get('/api/getthumimages/'+this.id);
            if (data.status === 0) {
                // console.log(data.message);
                this.swiperSrc = data.message;
            }
        },
        async getDetailContent() { 
            const { data } = await this.$http.get('/api/goods/getinfo/' + this.id);
            if (data.status === 0) {
                // console.log(data.message);
                this.detailContent = data.message[0];
            }
        },
        goodsDesc() {
            this.$router.push('/home/goodslist/goodsdetail/goodsdesc/'+this.detailContent.id);
        },
        goodsComment() {
            // this.$router.push('/home/goodslist/goodsdetail/goodscomment/' + this.detailContent.id);
            // 这里的name是在router.js中配置的
            // {path: 'xxxx', xxxx, name: 'goodsComment'},
            this.$router.push({name: 'goodsComment', params: {id: this.detailContent.id}});
        },
        // 映射store函数 
        ...mapMutations(['addToCarData']),
        
        addToCar() {
            this.ballFlag = !this.ballFlag;
            // console.log(this.num);
            // 默认是选中
            this.addToCarData({ id: this.detailContent.id, count: this.num, selected: true, price: this.detailContent.sell_price });
        },
        beforeEnter(el) {
            
        },
        // 这里暂时不加done去控制，done相当于是afterEnter函数的引用
        enter(el) {
            el.offsetWidth;
            const ballPos = el.getBoundingClientRect();
            const badgePos = document.getElementById('badge').getBoundingClientRect();
            var x = Math.abs(badgePos.left - ballPos.left);
            var y = Math.abs(badgePos.top - ballPos.top);

            el.style.transform = "translate("+ x +"px,"+ y +"px)";
            el.style.transition = "all 1s cubic-bezier(.58,-0.37,.83,.67)";
        },
        afterEnter(el) {
            el.style.transform = "translate(0,0)";
            el.style.transition = "none";
            this.ballFlag = !this.ballFlag;
        },

        // 获取数字中的数量
        getNum(num) {
            this.num = num;
            // console.log(this.num);
        }
    },
    props: ['id'],
    components: {
        swiper,
        numbox: numbox,
    }
}
</script>

<style lang="less" scoped>
    .goods-detail {
        background-color: #eee;
        // 有垂直外边距合并的问题
        overflow: hidden;
    }
    .price {
        span {
            &:first-of-type {
                margin-right: 15px;
            }
            &:last-of-type {
                color: red;
                font-size: 20px;
                font-weight: bold;
            }
        }
    }
    .mui-card-footer {
        flex-direction: column;
    }
    // 小球
    .ball {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 999;
        left: 135px;
        top: 370px;
        
    }
</style>