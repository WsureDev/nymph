//是否开发状态
const isDev = true;

//开发服务器地址（勿带末尾‘/’）
const DEV_BASE_URL = 'http://127.0.0.1:3000';

//线上服务器地址（勿带末尾‘/’）
const PRO_BASE_URL = 'https://zhshy.top';

const getBaerUrl = isDev ? DEV_BASE_URL : PRO_BASE_URL ;

export default {
	baseUrl:getBaerUrl
}