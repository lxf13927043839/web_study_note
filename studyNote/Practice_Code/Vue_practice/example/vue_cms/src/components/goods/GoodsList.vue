<template>
    <div class="goods-list">
        <router-link tag="div" :to="'/home/goodslist/goodsdetail/'+item.id" v-for="item in goodsList" :key="item.id" class="goods-item">
            <img :src="item.img_url" alt="">
            <h3>{{ item.title }}</h3>
            <div class="info">
                <div class="price">
                    <span class="new">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </div>
                <div class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
            </div>
        </router-link>
        <mt-button type="danger" size="large" plain @click="getMoreGoodsList" class="more">加载更多</mt-button>     
    </div>
</template>

<script>
export default {
    data: function () {
        return {
            goodsList: [],
            page: 1,
            isloaded: false,
        };
    },
    created: function () {
        this.getGoodsList();
    },
    methods: {
        async getGoodsList() {
            const { data } = await this.$http.get('/api/getgoods?pageindex=' + this.page);
            if (data.status === 0) {
                // console.log(data.message);
                this.goodsList = this.goodsList.concat(data.message);
                if (data.message.length === 0) {
                    this.isloaded = true;
                }
            }
        },
        getMoreGoodsList() {
            if (this.isloaded) {
                return;
            }
            this.page++;
            this.getGoodsList();
        }
    },


}
</script>

<style lang="less" scoped>
    .goods-list {
        list-style: none;
        margin: 0;
        padding: 0 7px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .goods-item {
            width: 49%;
            border: 1px solid #ccc;
            margin-top: 10px;
            box-shadow: 0 0 7px gray;
            padding: 0 2px;
            // 让图片和价格向上和向下的靠齐
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            img {
                width: 100%;
                // 不加的话，图片那一块会没有高度
                min-height: 170px;
            }
            h3 {
                font-size: 15px;
            }
            .info {
                background-color: #eee;
                padding: 5px;
                .price {
                    margin-bottom: 10px;
                    .new {
                        color: red;
                        font-size: 18px;
                        font-weight: bold;
                        margin-right: 15px;
                    }
                    .old {
                        font-size: 12px;
                        text-decoration: line-through;
                        color: gray;
                    }
                }
                .sell {
                    font-size: 12px;
                    color: gray;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
    }
    .more {
        margin-top: 15px;
    }
</style>