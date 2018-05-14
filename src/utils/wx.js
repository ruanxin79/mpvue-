export function setPageTitle (title) {
    wx.setNavigationBarTitle({title})    
}

export function getUserInfo () {
	return new Promise((resolve, reject) =>{
		wx.login({
			success: () => {
				wx.getUserInfo({
					success: (res) => resolve(res.userInfo),
					fail: (err) => reject(err)
				})
			},
			fail: (err) => reject(err)
		})	
	})
}