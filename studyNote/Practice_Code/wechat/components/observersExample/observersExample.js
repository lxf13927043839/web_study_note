// components/observersExample/observersExample.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },
    options: {
        pureDataPattern: /^_/,  
    },
    //设置生命周期函数
    lifetimes: {
        created() {
            console.log('created');
        },
        attached() {
            console.log('attached');
        },
        detached() {
            console.log('detached');
        }
    },
    // 监听所在页面的生命周期
    pageLifetimes: {
        show: function () {
            this._getRandomColor();
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        _rgb: {
            r: 0,
            g: 0,
            b: 0,
        },
        step: 1,
        fullColor: '0, 0, 0',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeR() {
            this.setData({
                '_rgb.r': this.data._rgb.r + this.data.step > 255 ? 255 : this.data._rgb.r + this.data.step,
            });
        },
        changeG() {
            this.setData({
                '_rgb.g': this.data._rgb.g + this.data.step > 255 ? 255 : this.data._rgb.g + this.data.step,
            });
        },
        changeB() {
            this.setData({
                '_rgb.b': this.data._rgb.b + this.data.step > 255 ? 255 : this.data._rgb.b + this.data.step,
            });
        },
        handleInput(e) {
            this.setData({
                step: e.detail.value - 0,
            });
        },
        _getRandomColor() {
            this.setData({
                '_rgb.r': Math.floor(Math.random() * 256),
                '_rgb.g': Math.floor(Math.random() * 256),
                '_rgb.b': Math.floor(Math.random() * 256),
            });
        },
    },
    observers: {
        '_rgb.r, _rgb.g, _rgb.b': function (r,g,b) {
            this.setData({
                fullColor : `${r}, ${g}, ${b}`,
            });
        }   
    },
    // 下边这段代码，会卡死系统，暂时不搞
    // observers: {
    //     'rgb.**': function (obj) {
    //         this.setData({
    //             'rgb.fullColor': `${obj.r}, ${obj.g}, ${obj.b}`,
    //         });
    //     }
    // }
   
})
