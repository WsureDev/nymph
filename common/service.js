import api from '@/common/vmeitime-http/'
function Login(){
	return new Promise((resolve,reject)=>{
		let Platform;
		
		//#ifdef MP-WEIXIN
		Platform = 'weixin'
		//#endif
		//#ifdef MP-QQ
		Platform = 'qq'
		//#endif
		uni.login({
			provider: Platform,
			success: (loginRes)=> {
				console.log(loginRes);
				api.openId({
					code : loginRes.code,
					platform : Platform,
				}).then((res)=>{
					console.log(res);
					resolve(res.data)
					
				}).catch((err)=>{
					reject(err)
					
					//qq小程序不支持.finally()
					//#ifndef MP-QQ
				}) .finally(()=>{
					
					
					//#endif
				});
			},
			fail(loginRes) {
				reject(loginRes)
			},
			complete:()=> {
				
			}
		});
	})
}

export default{
	Login
}