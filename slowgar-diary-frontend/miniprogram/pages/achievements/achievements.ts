interface Achievement {
  id: number
  name: string
  icon: string
  description: string
  unlocked: boolean
  unlockedAt?: string
}

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
    achievements: [] as Achievement[],
    stats: {
      totalDays: 0,
      totalRecords: 0,
      currentStreak: 0
    }
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

      if (app.globalData.isLoggedIn) {
        this.loadAchievements();
        this.loadStats();
      }
    },

    goToLogin() {
      wx.navigateTo({
        url: '/pages/auth/auth'
      });
    },

    loadAchievements() {
      // TODO: 从后端加载成就列表
      this.setData({
        achievements: []
      });
    },

    loadStats() {
      this.setData({
        stats: {
          totalDays: 15,
          totalRecords: 45,
          currentStreak: 3
        }
      });
    },

    shareToMoments() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    },

    onShareAppMessage() {
      return {
        title: '我在食记获得了新成就！',
        path: '/pages/auth/auth'
      };
    },

    onShareTimeline() {
      return {
        title: '我在食记获得了新成就！',
        query: ''
      };
    }
  }
}); 