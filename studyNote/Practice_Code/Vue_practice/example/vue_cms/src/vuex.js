import Vue from 'vue';

import Vuex from 'vuex';
Vue.use(Vuex);

const carData = JSON.parse(localStorage.getItem('carData')) || [];
// console.log(carData);

const store = new Vuex.Store({
    state: {
        // carData: [],// 存放对象{ id、count、selected、price }
        carData: carData,
    },
    mutations: {
        addToCarData(state, data) {
            // 先假设不存在
            var hasDataFlag = false;
            state.carData.some((item) => {
                if (item.id === data.id) {
                    item.count += data.count;
                    item.selected = data.selected;
                    item.price = data.price;
                    hasDataFlag = true;
                    // console.log(item.count);
                    return true;
                }
            });
            if (hasDataFlag === false) {
                state.carData.push(data);
            }

            // 顺便添加到本地localstorage存储起来
            // 如果这里有问题的话，在添加window.JSON..
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
        updateCarData(state, data) {
            state.carData.some((item) => {
                if (item.id === data.id) {
                    item.count = data.count;
                    return true;
                }
            });
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
        // 通过id删除数据
        delCarData(state, id) {
            state.carData.some((item, i) => {
                if (item.id === id) {
                    state.carData.splice(i, 1);
                    return true;
                }
            });
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
        // 更新selected值
        updateCarDataSelected(state, data) {
            state.carData.some((item, i) => {
                if (item.id === data.id) {
                    item.selected = data.selected;
                    return true;
                }
            });
            localStorage.setItem('carData', JSON.stringify(state.carData));
        }
    },
    getters: {
        totalCount(state) {
            var sum = 0;
            state.carData.forEach((item) => {
                sum += item.count;
            });
            // console.log(sum + 'getters');
            return sum;
        },
        // 获取所有的ID值组成的字符串，供购物车页面使用
        strId(state) {
            var arr = [];
            state.carData.forEach((item) => {
                arr.push(item.id);
            });
            return arr.join(',');
        },
        idandCount(state) {
            var obj = {};
            state.carData.forEach((item) => {
                obj[item.id] = item.count;
            });
            return obj;
        },
        idandSelected(state) {
            var obj = {};
            state.carData.forEach((item) => {
                obj[item.id] = item.selected;
            });
            return obj; 
        },
        // 选择的货物数量
        goodsCount(state) {
            let count = 0;
            state.carData.forEach((item) => {
                if (item.selected) {
                    count += item.count;
                }
            });
            return count;
        },
        sumPrice(state) {
            let sum = 0;
            state.carData.forEach((item) => {
                if (item.selected) {
                    sum += item.count * item.price;
                }
            });
            return sum;
        },
    },
});
export default store;