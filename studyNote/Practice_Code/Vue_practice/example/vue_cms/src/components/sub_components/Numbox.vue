<template>
    <div class="mui-numbox" data-numbox-min='1' :data-numbox-max="max">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="num" @change="valueChange"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from "../../lib/mui-3.7.1/dist/js/mui.js"
export default {
    data() {
        return {
        };
    },
    mounted: function() {
        mui('.mui-numbox').numbox();
        // console.log(this.max);

        // 页面挂在后就主动去触发一次，传值给父组件
        this.valueChange();
    },
    props: ['max'],

    watch: {
        max: function (newValue, oldValue) {
            // console.log(newValue, oldValue);
            mui('.mui-numbox').numbox().setOption('max', newValue);
        },
    },
    methods: {
        valueChange() {
            // 从文本框获取到的数字的字符串
            this.$emit('func', parseInt(this.$refs.num.value));
        },
    },
}
</script>

<style lang="less" scoped>

</style>