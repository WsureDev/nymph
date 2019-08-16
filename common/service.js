import api from '@/common/vmeitime-http/'
function Login(){
	return new Promise((resolve,reject)=>{
		uni.login({
			provider: 'weixin',
			success: (loginRes)=> {
				console.log(loginRes);
				api.openId({code:loginRes.code}).then((res)=>{
					console.log(res);
					resolve(res.data)
					
				}).catch((err)=>{
					reject(err)
				}).finally(()=>{
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