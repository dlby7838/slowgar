Component({
  data: {
    isSubmitting: false
  },

  methods: {
    handleSubmit(e: WechatMiniprogram.FormSubmit) {
      if (this.data.isSubmitting) return
      
      const content = e.detail.value.content?.trim()
      if (!content) {
        wx.showToast({
          title: '请输入内容',
          icon: 'error'
        })
        return
      }

      this.setData({ isSubmitting: true })
      wx.showLoading({ title: '提交中' })

      // TODO: 对接后端API
      setTimeout(() => {
        wx.hideLoading()
        this.setData({ isSubmitting: false })
        
        const pages = getCurrentPages()
        const recordsPage = pages[pages.length - 2]
        recordsPage?.setData({
          records: [{
            id: Date.now(),
            type: 'text',
            content,
            createTime: new Date().toISOString()
          }, ...recordsPage.data.records]
        })

        wx.navigateBack()
      }, 1000)
    }
  }
}) 