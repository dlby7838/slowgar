// app.ts
interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    isLoggedIn: boolean
  }
}

App<IAppOption>({
  globalData: {
    userInfo: null,
    isLoggedIn: false
  },

  onLaunch() {
    this.checkLoginStatus();
  },

  checkLoginStatus() {
    try {
      const token = wx.getStorageSync('token');
      const userInfo = wx.getStorageSync('userInfo');
      
      if (token && userInfo) {
        this.globalData.isLoggedIn = true;
        this.globalData.userInfo = userInfo;
      } else {
        this.globalData.isLoggedIn = false;
        this.globalData.userInfo = null;
        // 清除不完整的登录数据
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
      }
    } catch (e) {
      console.error('检查登录状态失败', e);
      this.globalData.isLoggedIn = false;
      this.globalData.userInfo = null;
    }
  }
});