const Fly = require("flyio/dist/npm/wx") 
const fly = new Fly;
export default function request (url, type='GET', params={}, headers) {
    return new Promise ((resolve, reject) => {
        let defaultOptions = {
            method: type,
            headers: {
                'Content-Type': type.toLowerCase() === 'get' ? 'application/x-www-form-urlencoded' : 'application/json'
            },
            //生产环境
            // baseURL: "http://alyweixin.lenovo.com.cn/weixin/index.php",
            //开发环境及测试环境
            baseURL: "http://weixin.lenovo.com.cn/weixin/index.php",
        };
        //http://testscanadmin.lenovo.com.cn
        if (headers) {
            let mergedHeader = Object.assign({}, defaultOptions.headers, headers);
            defaultOptions.headers = mergedHeader;
        }

        /*接口文档确定后要将resolve细分至状态码200*/
        fly.request(url, params, defaultOptions).then(res => resolve(res.data)).catch(err => reject(err))

    })
}