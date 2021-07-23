import {observable, action} from 'mobx-miniprogram';

export const store = observable({
    // 数据字段
    num1: 1,
    num2: 2,
    // 处理自定义tabbar，在切换页面时，active没有实时跟着变化
    avtiveIndex: 0,
    get sum() {
        return this.num1 + this.num2;
    },

    updateNum1: action(function (step) {
        this.num1 += step;
    }),

    updateNum2: action(function (step) {
        this.num2 += step;
    }),

    updateActive: action(function (val) {
        this.avtiveIndex = val;
    }),
});