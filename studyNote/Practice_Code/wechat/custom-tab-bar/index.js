// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import {store} from '../store/store.js';

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [storeBindingsBehavior],

    storeBindings: {
        store,
        fields: {
            sum: 'sum',
            active: 'avtiveIndex',
        },
        actions: {
            updateActive: "updateActive",
        }
    },
    observers: {
        sum: function(val) {
            this.setData({
                'list[1].needinfo': val,
            });
        }
    },

    options: {
        styleIsolation: "shared",
    },
    properties: {

    },
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
    /**
     * 组件的初始数据
     */
    data: {
        // 切换时候，会创建新实例，这里不能跟着变化
        // avtive: 0,
        "list":[
            {
              "pagePath": "/pages/home/home",
              "text": "首页",
              "iconPath": "/images/tabs/home.png",
              "selectedIconPath": "/images/tabs/home-active.png"
            },
            {
              "pagePath": "/pages/message/message",
              "text": "信息",
              "iconPath": "/images/tabs/message.png",
              "selectedIconPath": "/images/tabs/message-active.png",
              needinfo: 0,
            },
            {
              "pagePath": "/pages/concat/concat",
              "text": "联系",
              "iconPath": "/images/tabs/contact.png",
              "selectedIconPath": "/images/tabs/contact-active.png"
            }
        ]
    },


    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            this.updateActive(event.detail);
            // 如果要使用this.data.active来跳转，就需要加延时，否则还没来得及更新
            // 必须使用箭头函数，因为使用了this。不能改变它的指向
            // setTimeout( () => {
            //     wx.switchTab({
            //         url: this.data.list[this.data.active].pagePath,
            //       })
            // }, 10);
            // 使用event.detail就不用加延时
            //     wx.switchTab({
            //         url: this.data.list[this.data.active].pagePath,
            //       })
            this.updateStoreBindings();
            wx.switchTab({
                url: this.data.list[this.data.active].pagePath,
            })

        }
    }
})
