// components/comStore/comStore.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../store/store.js';

Component({
    behaviors: [storeBindingsBehavior],

    storeBindings: {
        store,
        fields: {
            // 采用简单的方式获取
            num1: 'num1',
            num2: 'num2',
            sum: 'sum',
        },
        actions: {
            updateNum1: 'updateNum1',
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeNum1(e) {
            this.updateNum1(e.target.dataset.step);
        }
    }
})
