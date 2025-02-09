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
    // 检查登录状态
    const token = wx.getStorageSync('token')
    if (token) {
      this.globalData.isLoggedIn = true
      this.globalData.userInfo = wx.getStorageSync('userInfo')
    }
  },
})