<template>
    <div>
        <h4>发表评论</h4>
        <hr />
        <textarea placeholder="请输入评论内容" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="commandArea" v-for="(item, i) in commentList" :key="i">
            <div class="info">
                <span>第{{ i+1 }}楼&nbsp;用户:{{ item.user_name }}&nbsp;</span>
                <span>发表时间：{{ item.add_time | dateFormat }}</span>
            </div>
            <div class="commandContent">
                {{ item.content }}
            </div>
        </div>          
        <mt-button type="danger" size="large" plain @click="getMoreCommentList">加载更多</mt-button>     
    </div>
</template>

<script>
    // 导入munt-ui中的Toast
    import { Toast } from 'mint-ui';

    export default {
        data: function () {
            return {
                commentList: [],
                page:1,
                msg: '',
            }
        },
        // 用来获取父组件中的id值
        props: ['id'],
        created: function () {
            this.getMoreCommentList();
        },
        methods: {
            async getMoreCommentList() {
                const { data } = await this.$http.get('/api/getcomments/'+ this.id + '?pageindex='+ this.page);
                // console.log(data);
                if (data.status === 0) {
                    this.commentList = this.commentList.concat(data.message);
                    if (data.message.length === 0) {
                        Toast('已无更多的评论');
                    } else {
                        this.page++;
                    }
                }
            },

            async postComment() {
                if (this.msg.trim().length <= 0) {
                    Toast('请输入内容');
                    this.msg = '';
                    return;
                }
                const {data} = await this.$http.post('/api/postcomment/'+ this.id, {
                    // 记录用户提交的次数，去除重复的数据
                    content: this.msg.trim(),
                });
                // console.log(data);
                // 提交成功在去拿数据,注意这不能再继续解构了，data已经被用了
                // 每次你提交数据，它在后台是排在最前面的，所以我把第一个page的第一个数据拿出来，然后加到commentList中就ok
                if (data.status === 0) {
                    const  dataLast = await this.$http.get('/api/getcomments/'+ this.id + '?pageindex=1');
                    this.commentList.unshift(dataLast.data.message[0]);
                    this.msg = '';
                } 
            },
        },
    }
</script>

<style lang="less" scoped>
    textarea {
        margin-bottom: 0;
    }
    .commandArea {
        padding-top: 5px;
        padding-bottom:5px;
        font-size: 14px;
        .info {
            background-color: #ccc;
            height: 30px;
            line-height: 30px;
        }
        .commandContent {
            margin: 10px 0;
            text-indent: 2em;
        }
    }
</style>