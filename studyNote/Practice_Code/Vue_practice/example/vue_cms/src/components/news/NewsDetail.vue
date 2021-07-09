<template>
    <div class="detailContent">
        <div class="title">
            <h3>{{ detailContent.title }}</h3>
            <p>
                <span>发布时间：{{ detailContent.add_time | dateFormat }}</span>
                <span>点击：{{ detailContent.click }}</span>
            </p>
        </div>
        <hr />
        <div class="content" v-html="detailContent.content"></div>
        <comment :id="id"></comment>
    </div>
</template>


<script>

export default {
    data: function () {
        return {
            detailContent: {},
        };
    },
    created: function () {
        this.getDetailContent();
    },

    methods: {
        async getDetailContent() {
            const { data } = await this.$http.get('/api/getnew/' + this.id);
            console.log(data);
            this.detailContent = data.message[0]; 
        }
    },

    props: ['id'],

}
</script>


<style lang="less">
    .detailContent {
        padding: 3px;
        .title {
            h3 {
                color: red;
                font-size: 17px;
                height: 30px;
                line-height: 30px;
                padding-top: 10px;
                // 它原有的样式是设置了 border-box的
                box-sizing: content-box;
                text-align: center;
            }
            p {
                display: flex;
                justify-content: space-between;
                color: skyblue;
            }
        }
    }
</style>