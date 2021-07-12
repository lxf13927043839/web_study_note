<template>
    <div class="app-container">
        <mt-header fixed title="Vue移动端">
            <span slot="left">
                <mt-button icon="back" v-show="backflag" @click="back">返回</mt-button>
            </span>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <transition>
            <router-view></router-view>
        </transition>

        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ totalCount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            backflag: false,
            // 如果设置的初始值为true，那么就必须在created中对他的路由进行判断，否则首页刷新后会显示返回
            // 实践后，发现在其他页刷新之后，返回会消失了，因为它又变成了false。一刷新之后，全部会重新创建的。
            // 最后发现都需要在created中进行判断
        };
    },
    created: function () {
        // console.log(this);
        if (this.$route.path === '/home') {
            this.backflag = false;
        } else {
            this.backflag = true;
        }
    },
    watch: {
        '$route.path': function (newVal, oldVal) {
            if (newVal === '/home') {
                this.backflag = false;
            } else {
                this.backflag = true;
            }
        },
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
    },    
    computed: {
        ...mapGetters(['totalCount']),
    }
}
</script>

<style lang="less" scoped>
    .app-container {
        padding-top: 40px;
        // 防止新闻模块被挡住了
        padding-bottom: 50px;
        overflow: hidden;
        // 第二种 解决方式，理解比较费劲
        // position: relative;
    }
    .v-enter {
        opacity: 0;
        transform: translateX(100%);

    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 1s linear;
        // 第二种 解决方式，理解比较费劲
        // position: absolute;
    }
    .mint-header.is-fixed {
        z-index: 999;
    }
</style>