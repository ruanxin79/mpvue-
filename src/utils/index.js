function formatNumber (n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime (date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}


export class ParamsValidate {
    constructor() {
        this.result = true;
        this.errMsg = '';
    }

    checkUserName (username) {
        let SpeChar = "@/'\"#$%&^*》《。，";

        if (!this.result) {
            return this;
        }
        
        if (!username) {
            this.result = false,
            this.errMsg = '用户名必填！'
        }

        for (let i = 0; i < SpeChar.length - 1; i++) {
            if (username.indexOf(SpeChar.substring(i, i+1)) !== -1)
            {
                this.result = false,
                this.errMsg = '用户名不能含有特殊字符'
            }
        }  

        return this      
    }

    checkPhone (phoneNum) {
        if (!this.result) {
            return this;
        }

        if (!phoneNum) {
            this.result = false,
            this.errMsg = '手机号码不能为空！'             
        }

        if(!(/^1[34578]\d{9}$/.test(phoneNum))){ 
            this.result = false,
            this.errMsg = '手机号码格式不正确'  
        } 
        return this
    }

    checkAddress (address) {
        if (!this.result) {
            
            return this;
        }

        if (!address) {
            this.result = false,
            this.errMsg = '详细地址不能为空！'          
        }
        return this
    }
}
