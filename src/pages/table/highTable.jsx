import React, { Component } from 'react'
import { Table, Card,Badge,Modal,message,Button } from 'antd'
import axios from './../../axios/index'

import './../../pages/ui/style.less'

export default class HighTable extends Component {
    state={
        asyncDataSource:[],
        asyncDataSource3:[],
        sortOrder:"ascend"
    }
    params={
        current:1
    }
    requestData=()=>{
        let _this=this;
        axios.ajax({
            method: "get",
            url: "/api/users",
            params:{
                ...this.params
            }
        }).then(res => {
            this.setState({
                asyncDataSource: res.data
            })
        })
    }
    requestData3=()=>{
        let _this=this;
        axios.ajax({
            method: "get",
            url: "/api/high/users",
            params:{
                ...this.params
            }
        }).then(res => {
            this.setState({
                asyncDataSource3: res.data
            })
        })
    }
    componentDidMount(){
        this.requestData()
        this.requestData3()
    }
    handleDelete=(item)=>{
        let id =item.id;
        Modal.confirm({
            title:"警告",
            content:"您确认删除吗？",
            onOk:()=>{
                message.success("删除成功");
                this.requestData();
            }
        })
    }
    render() {
        const columns = [
            {
                title: "编号",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "性别",
                dataIndex: "gender",
                render(gender) {
                    return gender == 0 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "0": "龙鸣",
                        "1": "孤儿",
                        "2": "铁憨憨",
                        "3": "哈麻批",
                        "4": "弱智"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                render(hobby) {
                    let config = {
                        "0": "弹吉他",
                        "1": "架子鼓",
                        "2": "唱歌",
                        "3": "贝斯",
                        "4": "尤克里里"
                    }
                    return config[hobby]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "地址",
                dataIndex: "address",
                render(address) {
                    let config = {
                        "0": "阴间",
                        "1": "棺材板里面",
                        "2": "灵堂",
                        "3": "双流机场",
                        "4": "楼上邻居家",
                        "5": "无家可归孤儿"
                    }
                    return config[address]
                }
            },
            {
                title: "起床时间",
                dataIndex: "getupTime"
            }
        ];

        const columns2 = [
            {
                title: "编号",
                dataIndex: "id",
                fixed:"left"
                //设置将该列固定到左边
            },
            {
                title: "用户名",
                dataIndex: "userName",
                fixed:"left"
            },
            {
                title: "性别",
                dataIndex: "gender",
                render(gender) {
                    return gender == 0 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "0": "龙鸣",
                        "1": "孤儿",
                        "2": "铁憨憨",
                        "3": "哈麻批",
                        "4": "弱智"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                render(hobby) {
                    let config = {
                        "0": "弹吉他",
                        "1": "架子鼓",
                        "2": "唱歌",
                        "3": "贝斯",
                        "4": "尤克里里"
                    }
                    return config[hobby]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "地址",
                dataIndex: "address",
                render(address) {
                    let config = {
                        "0": "阴间",
                        "1": "棺材板里面",
                        "2": "灵堂",
                        "3": "双流机场",
                        "4": "楼上邻居家",
                        "5": "无家可归孤儿"
                    }
                    return config[address]
                }
            },
            {
                title: "起床时间",
                dataIndex: "getupTime"
            }
        ];

        const columns3 = [
            {
                title: "编号",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "性别",
                dataIndex: "gender",
                render(gender) {
                    return gender == 0 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "0": "龙鸣",
                        "1": "孤儿",
                        "2": "铁憨憨",
                        "3": "哈麻批",
                        "4": "弱智"
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                render(hobby) {
                    let config = {
                        "0": "弹吉他",
                        "1": "架子鼓",
                        "2": "唱歌",
                        "3": "贝斯",
                        "4": "尤克里里"
                    }
                    return config[hobby]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title:"年龄",
                dataIndex:"age",
                sorter:(a,b)=>{
                    return a.age-b.age
                }
            },
            {
                title: "地址",
                dataIndex: "address",
                render(address) {
                    let config = {
                        "0": "阴间",
                        "1": "棺材板里面",
                        "2": "灵堂",
                        "3": "双流机场",
                        "4": "楼上邻居家",
                        "5": "无家可归孤儿"
                    }
                    return config[address]
                }
            },
            {
                title: "起床时间",
                dataIndex: "getupTime"
            }
        ];
        const columns4 = [
            {
                title: "编号",
                dataIndex: "id"
            },
            {
                title: "用户名",
                dataIndex: "userName"
            },
            {
                title: "性别",
                dataIndex: "gender",
                render(gender) {
                    return gender == 0 ? "男" : "女"
                }
            },
            {
                title: "状态",
                dataIndex: "state",
                render(state) {
                    let config = {
                        "0": <Badge status="success" text="成功"/>,
                        "1": <Badge status="error" text="错误"/>,
                        "2": <Badge status="warning" text="警告"/>,
                        "3": <Badge status="default" text="默认"/>,
                        "4": <Badge status="processing" text="进行中"/>
                    }
                    return config[state]
                }
            },
            {
                title: "爱好",
                dataIndex: "hobby",
                render(hobby) {
                    let config = {
                        "0": "弹吉他",
                        "1": "架子鼓",
                        "2": "唱歌",
                        "3": "贝斯",
                        "4": "尤克里里"
                    }
                    return config[hobby]
                }
            },
            {
                title: "生日",
                dataIndex: "birthday"
            },
            {
                title: "地址",
                dataIndex: "address",
                render(address,item) {
                    let config = {
                        "0": "阴间",
                        "1": "棺材板里面",
                        "2": "灵堂",
                        "3": "双流机场",
                        "4": "楼上邻居家",
                        "5": "无家可归孤儿"
                    }
                    return config[address]
                }
            },
            {
                title: "操作",
                render:(text,item)=>{
                    return <Button size="small" type="danger" onClick={()=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ];
        
        
        let {asyncDataSource,asyncDataSource3}=this.state;
        return (
            <div style={{width:"100%"}}>
                <Card title="头部固定" className="button-wrap">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                        scroll={{y:240}}
                        //设置允许y轴滚动，滚动区域高度为240px
                    />
                </Card>
                <Card title="左侧固定" className="button-wrap">
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                        scroll={{ x: 2000 }}
                    />
                </Card>
                <Card title="表格排序" className="button-wrap">
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={asyncDataSource3.list}
                        pagination={false}
                    />
                </Card>
                <Card title="操作按钮" className="button-wrap">
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
