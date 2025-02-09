// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
    },
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
  },

  methods: {
    handleLogin() {
      if (this.data.canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: '用于完善会员资料',
          success: (res) => {
            this.login(res.userInfo)
          }
        })
      }
    },

    login(userInfo: WechatMiniprogram.UserInfo) {
      wx.login({
        success: (res) => {
          if (res.code) {
            // TODO: 发送code到后端换取token
            wx.setStorageSync('userInfo', userInfo)
            wx.setStorageSync('token', 'mock-token') // 实际应该使用后端返回的token
            getApp<IAppOption>().globalData.userInfo = userInfo
            getApp<IAppOption>().globalData.isLoggedIn = true
            
            wx.switchTab({
              url: '/pages/records/records'
            })
          }
        }
      })
    }
  }
})
