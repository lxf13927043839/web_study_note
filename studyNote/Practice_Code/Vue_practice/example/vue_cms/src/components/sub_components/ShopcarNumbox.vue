<template>
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="count" ref="num" @change="valueChange"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui-3.7.1/dist/js/mui.js"
import { mapMutations } from 'vuex';
export default {
    data() {
        return {
        };
    },
    created: function () {
        // 不能在created中调用，页面还没有挂载上去
        // this.initCount();
    },
    mounted: function() {
        mui('.mui-numbox').numbox();
        // 不能使用refs去设置数字框的值，它是只读的属性。用来访问
        // this.initCount();
    },
    methods: {
        // 
        initCount() {
            this.$refs.num.value = this.count;
            // console.log(this.$refs.num.value);
        },

        ...mapMutations(['updateCarData']),

        // 监测数字框变化
        valueChange() {
            this.updateCarData({id: this.id, count: parseInt(this.$refs.num.value)});
        },
    },
    props: ['count', 'id'],
}
</script>

<style lang="less" scoped>
    .mui-numbox {
        height: 25px;
    }
</style>