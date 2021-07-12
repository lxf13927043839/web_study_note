<template>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in imgSrc" :key="item.id">
            <img :src="item[imgname]" alt="" :class="isfull?'imgfull':''">
        </mt-swipe-item>
    </mt-swipe>
</template>

<script>
export default {
    props: ['imgSrc', 'imgname', 'isfull']
}
</script>

<style lang="less" scoped>
    .mint-swipe {
        // 宽度会同比例缩放，180刚好是整个宽度
        text-align: center;
        height: 180px;
        img {
            height: 100%;   
        }
        .imgfull {
            width: 100%;
            height: 100%;   
        }
    }
</style>