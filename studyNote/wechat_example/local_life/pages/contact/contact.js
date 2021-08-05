// pages/contact/contact.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        randomColorList: [],
        isloading: false,
    },
    //获取颜色值
    getColor() {
        this.setData({
            isloading: true,
        });

        wx.showLoading({
          title: '加载中...',
        });
        wx.request({
          url: 'https://www.escook.cn/api/color',
          method: 'get',
          success: ({data}) => {
            //   console.log(data.data);
              this.setData({
                randomColorList: [...this.data.randomColorList, ...data.data],
            }); 
          },
          complete: () => {
              wx.hideLoading();
              this.setData({
                isloading: false,
              });
          }
        });
    }, 


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getColor();
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
        // 如果当前在请求数据，就不发送请求
        if (this.data.isloading) return;
        this.getColor();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})