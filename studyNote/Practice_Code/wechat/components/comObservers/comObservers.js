// components/comObservers/comObservers.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        sum: 0,
        n1: 0,
        n2: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addN1() {
            this.setData({
                n1: this.data.n1 + 1, 
            });
        },
        addN2() {
            this.setData({
                n2: this.data.n2 + 1, 
            });
        },
    },
    // 创建监听器
    observers: {
        'n1, n2': function (newN1, newN2) {
            this.setData({
                sum: newN1 + newN2,
            });
        }
    },
})
