<template>
    <div class="shopCarList">
        <div class="mui-card" v-for="item in shopList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner item">
                    <mt-switch v-model="idandSelected[item.id]" @change="statusChange({
                        id: item.id, selected: idandSelected[item.id]
                    })"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{ item.title }}</h1>
                        <div class="data-info">
                            <span>￥{{ item.sell_price }}</span>
                            <numbox :count="idandCount[item.id]" :id="item.id"></numbox>
                            <a href="javascript:void(0)" @click.prevent="del(item.id)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="total">
                        <p>总计（不包含运费）</p>
                        <p>已勾选商品 <span>{{ goodsCount }}</span> 件，总价 <span>￥{{ sumPrice }}</span></p>
                    </div>
                    <mt-button type="danger">去结算</mt-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import numbox from '../sub_components/ShopcarNumbox.vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
    data: function () {
        return {
            shopList: [],
        };
    },
    created: function () {
        this.getShopCarData();
        // console.log(this.idandSelected);
    },
    methods: {
        async getShopCarData() {
            if (this.strId.length <= 0) return;
            const { data } = await this.$http.get('/api/goods/getshopcarlist/' + this.strId);
            if (data.status === 0) {
                // console.log(data.message);
                this.shopList = data.message;
            }
        },

        ...mapMutations(['delCarData', 'updateCarDataSelected']),
        // 删除商品
        del(id) {
            this.shopList.some((item, i) => {
                if (item.id === id) {
                    this.shopList.splice(i, 1);
                    return true;
                }
            });
            this.delCarData(id);
        },
        // 商品选中状态的改变
        statusChange(data) {
            this.updateCarDataSelected(data);
        },
    },
    components: {
        numbox,
    },
    computed: {
        ...mapGetters(['strId', 'idandCount', 'idandSelected', 'goodsCount', 'sumPrice']),
    },

}

</script>

<style lang="less" scoped>
    .shopCarList {
        background-color: #eee;
        overflow: hidden;
        .mui-card-content-inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                width: 60px;
                height: 60px;
            }
            .info {
                h1 {
                    font-size: 14px;
                }
                .data-info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                }
            }
        }
        .total {
            span {
                color: red;
                font-weight: bold;
                font-size: 17px; 
            }
        }
    }
</style>