interface CalendarItem {
  date: string
  hasRecord: boolean
}

interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    isLoggedIn: boolean
  }
}

Component({
  data: {
    userInfo: null as WechatMiniprogram.UserInfo | null,
    calendarData: [] as CalendarItem[],
    currentMonth: '',
    statistics: {
      monthlyRecords: 0,
      averageCalories: 0
    }
  },

  lifetimes: {
    attached() {
      const app = getApp<IAppOption>()
      if (!app.globalData.isLoggedIn) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
        return
      }

      this.setData({
        userInfo: app.globalData.userInfo
      })
      this.loadCalendarData()
      this.loadStatistics()
    }
  },

  methods: {
    loadCalendarData() {
      // TODO: 从后端加载打卡日历数据
      const now = new Date()
      this.setData({
        currentMonth: `${now.getFullYear()}年${now.getMonth() + 1}月`,
        calendarData: [
          { date: '2024-03-20', hasRecord: true },
          { date: '2024-03-21', hasRecord: true },
          { date: '2024-03-22', hasRecord: false }
        ]
      })
    },

    loadStatistics() {
      this.setData({
        statistics: {
          monthlyRecords: 45,
          averageCalories: 1800
        }
      })
    },

    goToLogin() {
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
    },

    handleLogout() {
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            const app = getApp<IAppOption>()
            app.globalData.isLoggedIn = false
            app.globalData.userInfo = null
            
            wx.switchTab({
              url: '/pages/records/records'
            })
          }
        }
      })
    }
  }
}) 