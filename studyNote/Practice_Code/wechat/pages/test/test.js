// pages/test/test.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        count: 0,
        name: '凯美瑞',
        imgSrc: '/images/kmr.jpeg',
        randomNum: Math.random() * 10,
        randomNum1: Math.random().toFixed(2),
        text: 'hello Tom',
        flag: true,
        fruit: ['西瓜', '橙子','葡萄'],
        userList: [
            {id: 1, name: 'Tom'},
            {id: 2, name: 'hello'},
            {id: 3, name: 'Jerry'},
        ],
    },

    changeDataHandle(e) {
        this.setData({
            count: this.data.count + e.target.dataset.step,
        });
        console.log(e);
    },

    inputHandle(e) {
        // console.log(e.detail.value);
        this.setData({
            text: e.detail.value,
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})