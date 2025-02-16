interface IAppOption {
  globalData: {
    userInfo: WechatMiniprogram.UserInfo | null
    isLoggedIn: boolean
  }
}

interface FoodRecord {
  id: number
  type: string
  imageUrl: string
  analysis: {
    calories: number
    cuisine: string
    carbs: number
  }
  createTime: string
}

Component({
  data: {
    isLoggedIn: false,
    records: [] as FoodRecord[],
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

      if (app.globalData.isLoggedIn) {
        this.loadRecords();
      }
    },

    onAddRecord() {
      if (!this.data.isLoggedIn) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      }

      wx.navigateTo({
        url: '/pages/records/text-record/text-record'
      });
    },

    loadRecords() {
      // TODO: 从后端加载记录
      this.setData({
        records: [
          {
            id: 1,
            type: 'photo',
            imageUrl: '/images/default-food.png',
            analysis: {
              calories: 350,
              cuisine: '川菜',
              carbs: 45
            },
            createTime: new Date().toISOString()
          }
        ]
      });
    },

    handlePhotoRecord() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          this.uploadAndAnalyze(res.tempFilePaths[0])
        }
      })
    },

    handleTextRecord() {
      wx.navigateTo({
        url: '/pages/records/text-record/text-record'
      })
    },

    handleVoiceRecord() {
      // TODO: 实现语音记录
    },

    async uploadAndAnalyze(filePath: string) {
      wx.showLoading({ title: '正在分析' })
      // TODO: 对接后端上传和AI分析接口
      setTimeout(() => {
        wx.hideLoading()
        const newRecord = {
          id: Date.now(),
          type: 'photo',
          imageUrl: filePath,
          analysis: {
            calories: 350,
            cuisine: '川菜',
            carbs: 45
          },
          createTime: new Date().toISOString()
        }
        this.setData({
          records: [newRecord, ...this.data.records]
        })
      }, 2000)
    }
  }
}) 