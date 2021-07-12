<template>
    <div>
        <h2 class="title">{{ goodsDesc.title }}</h2>
        <hr />
        <p v-html="goodsDesc.content"></p>
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            goodsDesc: {},
        };
    },
    created: function () {
        this.getGoodsDesc();
    },
    methods: {
        async getGoodsDesc() {
            const { data } = await this.$http.get('/api/goods/getdesc/'+ this.id);
            if (data.status === 0) {
                // console.log(data.message);
                this.goodsDesc = data.message[0];
            }
        }
    },
    props: ['id'],
}
</script>


<style lang="less" scoped>
    .title {
        text-align: center;
        color: skyblue;
        font-size: 16px;
    }
    /deep/.gomeImgLoad {
        width: 100%;
    }
</style>