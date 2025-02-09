interface Achievement {
  id: number
  name: string
  icon: string
  description: string
  unlocked: boolean
  unlockedAt?: string
}

Component({
  data: {
    isLoggedIn: false,
    achievements: [] as Achievement[],
    stats: {
      totalDays: 0,
      totalRecords: 0,
      currentStreak: 0
    }
  },

  lifetimes: {
    attached() {
      const app = getApp()
      this.setData({
        isLoggedIn: app.globalData.isLoggedIn
      })
      
      if (app.globalData.isLoggedIn) {
        this.loadAchievements()
        this.loadStats()
      }
    }
  },

  methods: {
    goToLogin() {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    },

    loadAchievements() {
      // TODO: 从后端加载成就数据
      this.setData({
        achievements: [
          {
            id: 1,
            name: '初次打卡',
            icon: '/images/achievements/first-record.png',
            description: '记录第一次血糖',
            unlocked: true,
            unlockedAt: '2024-03-20'
          },
          {
            id: 2,
            name: '连续打卡7天',
            icon: '/images/achievements/week-streak.png',
            description: '连续记录7天血糖',
            unlocked: false
          }
        ]
      })
    },

    loadStats() {
      this.setData({
        stats: {
          totalDays: 15,
          totalRecords: 45,
          currentStreak: 3
        }
      })
    },

    shareToMoments() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
    },

    onShareAppMessage() {
      return {
        title: '我在食记获得了新成就！',
        path: '/pages/auth/auth'
      }
    },

    onShareTimeline() {
      return {
        title: '我在食记获得了新成就！',
        query: ''
      }
    }
  }
}) 