<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id === 0?'mui-active':'']" v-for="item in photoCategory" :key="item.id" @click="changeImg(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <ul class="lazyImg">
            <router-link tag="li" :to="'/home/photoshare/photodetail/' + item.id" v-for="item in imgList" :key="item.id">
                <img v-lazy="item.img_url" class="hello">
                <div class="info">
                    <h4>{{ item.title }}</h4>
                    <p>{{item.zhaiyao}}</p>
                </div>   
            </router-link>
        </ul>

    </div>
</template>

<script>
    import mui from '../../lib/mui-3.7.1/dist/js/mui.js';
    export default {
        data() {
            return {
                photoCategory: [],
                imgList: [],
            };
        },
        created: function () {
            this.getCategory();
            this.getImgList(0);
        },
        methods: {
            async getCategory() {
                const { data } = await this.$http.get('/api/getimgcategory');
                if (data.status === 0) {
                    // console.log(data.message);
                    this.photoCategory = data.message;
                    this.photoCategory.unshift({
                        title: '全部',
                        id: 0,
                    });
                }
            },
            async getImgList(id) {
                const { data } = await this.$http.get('/api/getimages/'+ id);
                if (data.status === 0) {
                    // console.log(data.message);
                    this.imgList = data.message;
                }
            },
            changeImg(id) {
                this.getImgList(id);
            }
        },
        mounted() {
            // 如果这里不写在这里，那么它不会起作用，因为只有当页面的Dom都挂载完毕后，在用js初始化才有效
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        
    }
</script>

<style lang="less" scoped>
    .mui-slider {
        touch-action: pan-x;
    }
    .lazyImg {
        list-style: none;
        padding: 10px;
        margin: 0;
        li {
            background-color: #ccc;
            box-shadow: 0 0 7px gray;
            position: relative;
            &+li {
                margin-top: 10px;
            }
            img {
                width: 100%;
                vertical-align: middle;
            }
            .info {
                background-color: rgba(0,0,0,.5);
                position: absolute;
                bottom: 0;
                color: #fff;
                max-height: 100px;
                overflow: hidden;
                h4 {
                    font-size: 15px;
                    text-align: center;
                }
                p {
                    font-size: 13px;
                    color: #fff;
                    text-indent: 2em;
                }
            }

            // 加载的小圆圈看不到
            img[lazy="loading"] {
                width: 40px;
                height: 100px;
                margin: auto;
            }
        }
    }

</style>