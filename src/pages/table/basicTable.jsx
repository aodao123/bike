import React, { Component } from 'react'
import { Table, Card, Modal, Button, message } from 'antd'
import axios from './../../axios/index'
import untils from './../../until/untils'

import './../../pages/ui/style.less'

export default class BasicTable extends Component {
    state = {
        colums: [],
        dataSource: [],
        asyncDataSource: []
    }
    params={
        current:1
    }
    componentDidMount() {
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
        const dataSource = [
            {
                id: "0",
                key: "0",
                userName: "孙狗",
                gender: "0",
                state: "2",
                hobby: "1",
                birthday: "1994/04/04",
                address: "2",
                getupTime: "00:00:00"
            },
            {
                id: "1",
                key: "1",
                userName: "孙犬",
                gender: "0",
                state: "1",
                hobby: "2",
                birthday: "1994/04/04",
                address: "4",
                getupTime: "00:00:00"
            },
            {
                id: "2",
                key: "2",
                userName: "孙笑川",
                gender: "1",
                state: "0",
                hobby: "0",
                birthday: "1994/04/04",
                address: "3",
                getupTime: "00:00:00"
            },
            {
                id: "3",
                key: "3",
                userName: "SunXiaoChuang",
                gender: "1",
                state: "2",
                hobby: "4",
                birthday: "1994/04/04",
                address: "4",
                getupTime: "00:00:00"
            }
        ];
        this.setState({
            dataSource,
            columns
        })
        this.requestData();
    }
    requestData=()=>{
        
        axios.ajax({
            method: "get",
            url: "/api/users",
            params:{
                ...this.params
            }
        }).then(res => {
            this.setState({
                asyncDataSource: res.data,
                selectedRowKeys:[],
                pagination:untils.pagination(res.data,(current)=>{
                    //callback
                    this.params.current=current;
                    this.requestData();
                })
            })
        })
    }

    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        Modal.info({
            title: "信息",
            content: `
            用户名：${record.userName}
            `
        })
        this.setState({
            selectedRowKeys,
            selectedItem: record
        })
    }

    handleDeleted = () => {
        let { selectedRowKeys, asyncDataSource } = this.state;
        console.log(selectedRowKeys)
        Modal.confirm({
            title: `您确定要删除吗？`,
            okText: "确定",
            cancelText: "取消",
            onOk:()=> {
                this.requestData();
                message.success("删除成功！")
            }
        })
    }
    render() {
        let { dataSource, columns, asyncDataSource, selectedRowKeys,pagination } = this.state;
        return (
            <div style={{width:"100%"}}>
                <Card title="基础表格" className="button-wrap">
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    // 去掉分页
                    />
                </Card>
                <Card title="动态表格" className="button-wrap">
                    <Table
                        columns={columns}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                    />
                </Card>
                <Card title="单选按钮-Mock" className="button-wrap">
                    <Table
                        columns={columns}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys: selectedRowKeys
                        }}
                        onRow={(record, index) => {
                            // record是以对象的形式，返回当前行中的数据
                            return {
                                onClick: () => { this.onRowClick(record, index) }
                            }
                        }}
                    />
                </Card>
                <Card title="复选框-Mock" className="button-wrap">
                    <Table
                        columns={columns}
                        dataSource={asyncDataSource.list}
                        pagination={false}
                        rowSelection={{
                            type: "checkbox",
                            selectedRowKeys,
                            onChange: (selectedRowKeys) => {
                                this.setState({
                                    selectedRowKeys
                                })
                            }
                        }}
                    />
                    <div>
                        <Button
                            type="danger"
                            style={{ float: "right", marginTop: 10 }}
                            onClick={this.handleDeleted}
                        >删除</Button>
                    </div>
                </Card>
                <Card title="分页表格" className="button-wrap">
                    <Table
                        columns={columns}
                        dataSource={asyncDataSource.list}
                        pagination={pagination}
                    />
                </Card>
            </div>
        )
    }
}
