<template>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
            <router-link :to="'/home/news/detail/'+ item.id">
                <img class="mui-media-object mui-pull-left" v-bind:src="item.img_url">
                <div class="mui-media-body">
                    <h3>{{ item.title }}</h3>
                    <p class='mui-ellipsis'>
                        <span>发表时间：{{ item.add_time | dateFormat}}</span>
                        <span>点击：{{ item.click }}</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        data: function () {
            return {
                newsList: [],
            };
        },
        created: function () {
            this.getNewsList();
        },
        
        methods: {
            // 使用axios获取数据
            async getNewsList() {
                const { data } = await this.$http.get('/api/getnewslist');
                // console.log(data.status);
                if (data.status === 0) {
                   this.newsList = data.message;
                }
            },
        },
    }
</script>

<style lang="less">
    .mui-media-body {
        h3 {
            font-size: 15px;
        }

        .mui-ellipsis {
            display: flex;
            justify-content: space-between;
            color: slateblue;
        }
    }
</style>