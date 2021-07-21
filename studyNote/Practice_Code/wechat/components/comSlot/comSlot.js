// components/comSlot/comSlot.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        countFromFather: Number,
    },
    // 启用多个插槽
    options: {
        multipleSlots: true,
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
        addCount() {
            this.setData({
                countFromFather: this.data.countFromFather + 1,
            });
            this.triggerEvent('sync', {value: this.data.countFromFather});
        },
    }
})
