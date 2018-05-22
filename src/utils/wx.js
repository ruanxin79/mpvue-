export function setPageTitle (title) {
    wx.setNavigationBarTitle({title})    
}

export function getLoginCode () {
	return new Promise((resolve, reject) => {
		wx.login({
			success: (res) => resolve(res.code),
			fail: (err) => reject(err)
		})	
	})
}

export function getUserInfo () {
	return new Promise((resolve, reject) => {
		wx.getUserInfo({
			success: (res) => resolve(res.userInfo),
			fail: (err) => reject(err)
		})
	})	
}
