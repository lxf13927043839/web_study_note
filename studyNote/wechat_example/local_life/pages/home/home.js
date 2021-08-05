// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperImgList: [],
        gridList: [],
    },

    // 获取图片的资源
    getSwiperImgList() {
        wx.request({
          url: 'https://www.escook.cn/slides',
          method: 'GET',
          success: (data) => {
            // console.log(data);
            this.setData({
                swiperImgList: data.data,
            });
          }
        })
    },
    // 获取九宫格数据
    getGridList() {
        wx.request({
          url: 'https://www.escook.cn/categories',
          method: 'GET',
          success: (data) => {
            //   console.log(data);
              this.setData({
                gridList: data.data,
            });
          }
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperImgList();
        this.getGridList();
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