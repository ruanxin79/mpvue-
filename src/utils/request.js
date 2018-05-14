const Fly = require("flyio/dist/npm/wx") 
const fly = new Fly;
export default function request (url, type='GET', params={}, headers) {
    return new Promise ((resolve, reject) => {
        let defaultOptions = {
            method: type,
            headers: {
                'Content-Type': type.toLowerCase() === 'get' ? 'application/x-www-form-urlencoded' : 'application/json'
            },
            baseURL: "http://testscanadmin.lenovo.com.cn/index.php/Scanadmin",
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