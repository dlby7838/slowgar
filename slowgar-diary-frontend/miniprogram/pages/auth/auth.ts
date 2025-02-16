interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    isLoggedIn: boolean
  }
}

Component({
  data: {
    canIUseGetUserProfile: false,
    agreed: false,
    loading: false
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

    async handleLogin() {
      if (!this.data.agreed) return;
      
      this.setData({ loading: true });
      try {
        if (this.data.canIUseGetUserProfile) {
          const res = await wx.getUserProfile({
            desc: '用于完善用户资料'
          });
          await this.login(res.userInfo);
        } else {
          // 如果不能使用 getUserProfile，则使用默认的登录方式
          await this.loginDefault();
        }
      } catch (error) {
        console.error('登录失败:', error);
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      } finally {
        this.setData({ loading: false });
      }
    },

    async login(userInfo: WechatMiniprogram.UserInfo) {
      const { code } = await wx.login();
      
      if (code) {
        // TODO: 发送 code 到后端换取 token
        // 这里需要对接你的后端服务
        const token = 'mock-token';
        
        // 保存登录信息
        wx.setStorageSync('token', token);
        wx.setStorageSync('userInfo', userInfo);

        // 更新全局状态
        const app = getApp<IAppOption>();
        app.globalData.isLoggedIn = true;
        app.globalData.userInfo = userInfo;

        // 返回上一页
        wx.switchTab({
          url: '/pages/records/records'
        });

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
      }
    },

    async loginDefault() {
      // 使用默认用户信息登录
      const userInfo: WechatMiniprogram.UserInfo = {
        nickName: '默认用户',
        avatarUrl: '',
        gender: 0,
        country: '',
        province: '',
        city: '',
        language: 'zh_CN'
      };
      await this.login(userInfo);
    }
  }
}) 