// components/com/com.js
Component({
    options: {
        // styleIsolation: 'shared',
        styleIsolation: 'isolated',
    },
    /**
     * 组件的属性列表
     */
    properties: {
        max: {
            type: Number,
            value: 10,
        },
        // 简写形式
        // max: Number
    },

    /**
     * 组件的初始数据
     */
    data: {
        count: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        addCount() {
            if (this.data.count >= this.properties.max) return;
            this.setData({
                count: this.data.count + 1,
                max: this.properties.max + 1,
            });
            this._showCount(); 
        },
        _showCount() {
            wx.showToast({
              title: this.data.count + '',
              icon: 'none',
            })
        },
        showDataAndProperties() {
            console.log(this.data);
            console.log(this.properties);
            console.log(this.data === this.properties);
        }
    }
})
