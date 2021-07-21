// pages/shopList/shopList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: {},
        shopDataList: [],
        page: 1,
        pageSize: 10,
        // 节流阀，标志位
        isLoading: false,
        total: 0,
    },
    // 获取服务器数据
    getShopDataList(cb) {
        this.setData({
            isLoading: true,
        });
        wx.showLoading({
          title: '数据正在加载...',
        });
        wx.request({
          url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
          data: {
            _page: this.data.page,
            _limit: this.data.pageSize,
          },
          success: (data) => {
            console.log(data);
            this.setData({
                shopDataList: [...this.data.shopDataList, ...data.data],
                // 用这个xx - 0，也能将xx转成数字
                total: parseInt(data.header['X-Total-Count']),
            });
          },
          complete: () => {
              wx.hideLoading();
            //   处理下拉刷新
             cb && cb();
              this.setData({
                  isLoading: false,
              }); 
          }
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            query: options,
        });
        this.getShopDataList();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setNavigationBarTitle({
          title: this.data.query.title,
        });
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
        // 下拉刷新就是把所有的数据都清空，重新请求一下
        this.setData({
            total: 0,
            shopDataList: [],
            page: 1,
        });
        // 这里需要处理下拉刷新，传递进去回调函数
        this.getShopDataList(() => {
            wx.stopPullDownRefresh();
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 判断当前是否已经加载完毕
        if (this.data.page * this.data.pageSize >= this.data.total ) {
            wx.showToast({
              title: '数据加载完毕！',
              icon: 'none',
            });
            return;
        }
        // 在申请数据，直接返回
        if (this.data.isLoading) return;

        this.setData({
            page: this.data.page + 1,
        });
        this.getShopDataList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})