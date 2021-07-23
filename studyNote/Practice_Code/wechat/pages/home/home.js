// pages/home/home.js

const behavior = require('../../myBehavior/myBehavior.js');
import { createStoreBindings } from 'mobx-miniprogram-bindings';
import { store } from '../../store/store.js';

Page({
    async testPromise() {
      const {data: res} = await wx.p.request({
        url: 'https://www.escook.cn/api/get',
        data: {
          name: 'Tom',
          age: 23,
        },
        method: 'GET',
      });
      console.log(res);
    },

    behaviors: [behavior],
    /**
     * 页面的初始数据
     */
    data: {
      count: 100,
    },
    // 测试behavior
    getBehavior() {
      this.say();
    },

    // 给子组件绑定事件
    syncCount(e) {
      // console.log('syncCount');
      // console.log(e);
      this.setData({
        count: e.detail.value,
      });
    },
    // 获取子组件中的对象
    getChildCom() {
      const child = this.selectComponent('.my-slot');
      // console.log(child);
      console.log(child.properties.countFromFather);
      child.addCount();
    },
 
    // 跳转message页面
    goToMessage() {
      wx.switchTab({
        url: '/pages/message/message',
      })
    },
    goToIndex() {
      wx.navigateTo({
        url: '/pages/index/index?name=Tom&password=Jerry',
      })
    },

    // 发送get请求
    getInfo() {
        wx.request({
          url: 'https://www.escook.cn/api/get',
          data: {
            name: 'Tom',
            age: 23,
          },
          method: 'GET',
          success: (result) => {
              console.log(result.data);
          }
        })
    },
    // 发送post请求
    postInfo() {
        wx.request({
          url: 'https://www.escook.cn/api/post',
          data: {
            name: 'Jerry',
            age: 23,
          },
          method: 'post',
          success: (result) => {
              console.log(result.data);
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // this.getInfo();
        // this.postInfo();
        
        // 进行的是跟store方法进行绑定
        this.stroeBindings = createStoreBindings(this, {
          store,
          fields: ['num1', 'num2', 'sum'],
          actions: ['updateNum1','updateNum2'],
        });
        // console.log(this.stroeBindings);
    },
    changeNum1(e) {
      // console.log(e);
      this.updateNum1(e.target.dataset.step - 0);
    },
    changeNum2(e) {
      this.updateNum2(e.target.dataset.step - 0);
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
      this.stroeBindings.destroyStoreBindings();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      console.log('上拉触底');
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})