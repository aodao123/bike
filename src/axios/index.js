import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import untils from './../until/untils'
export default class Axios {
    static jsonp(options) {
        // static定义静态方法
        // 封装可以跨域的jsonp
        return new Promise((resolve, reject) => {
            JsonP(options.url, { param: "callback" }, (error, response) => {
                try {
                    resolve(response);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }

    static ajax(options) {
        // 对axios二次封装
        return new Promise((resolve, reject) => {
            let baseUrl = "https://www.fastmock.site/mock/921daac4a011e3b40ec07caad5634935/bike";
            axios({
                method: options.method,
                url: options.url,
                timeout: 5000,
                baseURL: baseUrl,
                params: options.params
            }).then(res => {
                try {
                    if (res.status == "200") {
                        let data = res.data;
                        if (data.status == "1001") {
                            resolve(data)
                        } else {
                            throw new Error(data.msg);
                        }
                    } else {
                        throw new Error("接口连接失败");
                    }
                } catch (error) {
                    Modal.info({
                        title: "提示",
                        content: error.message
                    })
                }
            }).catch(error => {
                reject(error)
            })
        });
    }

    static requestList(_this, url, params) {
        // 请求表格数据逻辑代码的封装,目前只有订单管理使用了该封装
        _this.setState({
            loading: true
        });
        this.ajax({
            url,
            params: {
                ...params
            }
        }).then(res => {
            if (res) {
                res.data.list.map((value, index) => {
                    value.key = index;
                    return value
                })
                _this.setState({
                    dataSource: res.data,
                    pagination: untils.pagination(res.data, (current) => {
                        //callback
                        _this.params.current = current;
                        _this.requestData();
                    })
                })
                _this.setState({
                    loading: false
                });
            }
        })
    }
}