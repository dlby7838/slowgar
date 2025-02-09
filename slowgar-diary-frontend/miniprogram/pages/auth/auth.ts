Component({
  data: {
    canIUseGetUserProfile: false,
    agreed: false
  },

  lifetimes: {
    attached() {
      // 检查是否已登录
      const token = wx.getStorageSync('token')
      if (token) {
        wx.switchTab({
          url: '/pages/records/records'
        })
        return
      }

      if (typeof wx.getUserProfile === 'function') {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    }
  },

  methods: {
    toggleAgreement() {
      this.setData({
        agreed: !this.data.agreed
      })
    },

    showAgreement() {
      // TODO: 显示用户协议
      wx.showModal({
        title: '用户协议',
        content: '这里是用户协议内容...',
        showCancel: false
      })
    },

    handleLogin() {
      if (!this.data.agreed) return
      
      if (this.data.canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: '用于完善用户资料',
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
            // 发送 res.code 到后端换取 token
            // 这里需要对接你的后端服务
            wx.setStorageSync('userInfo', userInfo)
            wx.setStorageSync('token', 'mock-token')
            wx.switchTab({
              url: '/pages/records/records'
            })
          }
        }
      })
    }
  }
}) 