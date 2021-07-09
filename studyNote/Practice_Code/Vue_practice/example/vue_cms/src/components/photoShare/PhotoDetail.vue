<template>
    <div class="photo-detail">
        <!-- 标题 -->
        <h3>{{ detailContent.title }}</h3>
        <p>
            <span>发布时间: {{ detailContent.add_time | dateFormat }}</span>
            <span>点击：{{ detailContent.click }}次</span>
        </p>
        <hr>
        <div v-html="detailContent.content" class="detail-content"></div>
        <!-- 缩略图 -->
        <!-- <img v-for="(item, index) in thumbImgList" :key="index" :src="item.src" alt=""> -->
        <vue-preview :slides="thumbImgList" class="preview-my"></vue-preview>
        <comment :id="id"></comment>
    </div>
</template>
<script>

export default {
    data: function () {
        return {
            detailContent: {},
            thumbImgList: [],
        };
    },
    created: function () {
        this.getDetailContent();
        this.getThumbImgList();
    },
    methods: {
        async getDetailContent() {
            const { data } = await this.$http.get('/api/getimageInfo/' + this.id);
            if (data.status === 0) {
                // console.log(data.message);
                this.detailContent = data.message[0];
            }
        },
        async getThumbImgList() {
            const { data } = await this.$http.get('/api/getthumimages/' + this.id);
            if (data.status === 0) {
                console.log(data.message);
                this.thumbImgList = data.message;
                this.thumbImgList.forEach(item => {
                    item.w = 400;
                    item.h = 400;
                    item.msrc = item.src;
                });
            }
        }
    },
    props: ['id'],

}
</script>

<style lang="less" scoped>
    .photo-detail {
        padding: 3px;
        h3 {
            font-size: 15px;
            color: skyblue;
            text-align: center;
            margin: 15px 0;
        }
        p {
            display: flex;
            justify-content: space-between;
        }
        .detail-content {
            font-size: 13px;
            line-height: 30px;
            text-indent: 2em;
        }
        // 它引用的是第三方样式，我们不能scoped修改别人的，它只是针对于自身
        /deep/ .my-gallery {
            figure {
                margin: 0;
                display: inline-block;
                img {
                    height: 100px;
                    width: 100px;
                    margin: 5px;
                    box-shadow: 0 0 7px gray;
                }
            }
        }
    }
    
</style>