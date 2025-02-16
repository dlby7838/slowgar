interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    isLoggedIn: boolean
  }
}

Component({
  data: {
    isLoggedIn: false,
    userInfo: null as WechatMiniprogram.UserInfo | null,
  },

  lifetimes: {
    attached() {
      this.checkLoginStatus();
    }
  },

  pageLifetimes: {
    show() {
      this.checkLoginStatus();
    }
  },

  methods: {
    checkLoginStatus() {
      const app = getApp<IAppOption>();
      this.setData({
        isLoggedIn: app.globalData.isLoggedIn,
        userInfo: app.globalData.userInfo
      });
    },

    goToLogin() {
      wx.navigateTo({
        url: '/pages/auth/auth',
        fail: (err) => {
          console.error('跳转失败', err);
          wx.showToast({
            title: '跳转失败，请重试',
            icon: 'none'
          });
        }
      });
    },

    handleLogout() {
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            const app = getApp<IAppOption>();
            app.globalData.isLoggedIn = false;
            app.globalData.userInfo = null;
            
            this.setData({
              isLoggedIn: false,
              userInfo: null
            });

            wx.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    }
  }
}); 