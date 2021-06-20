import React, { Component } from 'react'
import { Card, Button,Spin } from 'antd'
import {PlusOutlined,EditOutlined,DeleteOutlined} from '@ant-design/icons'
import axios from './../../axios/index'
import untils from './../../until/untils'
import ETable from './../../components/ETable/index'
import BaseForm from './../../components/BaseForm/index'

export default class User extends Component {
    state = {
        dataSource: {},
        loading:false
    }
    params = {
        current: 1
    }
    componentDidMount() {
        this.requestData()
    }
    requestData = () => {
        axios.requestList(this, "/api/users", this.params)
    }
    render() {
        const formData = {
            layout: "inline",
            onFinish: (value) => {
                console.log(value)
            },
            list: [
                {
                    type: "INPUT",
                    name: "user_name",
                    placeholder: "请输入用户名",
                    width: 80,
                    rules: [
                        {
                            required: true,
                            message: "请输入用户名"
                        }
                    ],

                },
                {
                    type: "INPUT",
                    name: "user_mobile",
                    placeholder: "请输入用户手机号",
                    width: 80,
                    rules: [
                        {
                            required: true,
                            message: "请输入手机号"
                        }
                    ],

                },
                {
                    type: "DATEPICER",
                    name: "user_date",
                    placeholder: "请选择入职时间"
                },
                {
                    type: "BUTTON",
                    buttonType: "primary",
                    htmlType: "submit",
                    label: "查询"
                },
                {
                    type: "BUTTON",
                    htmlType: "reset",
                    label: "重置"
                }
            ]
        }
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
        let { dataSource,loading,pagination,selectedRowKeys } = this.state
        return (
            <div>
                <Card>
                    <BaseForm formData={formData} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" icon={<PlusOutlined/>}>创建员工</Button>
                    <Button type="primary" icon={<EditOutlined/>} style={{ marginLeft: 10 }}>编辑员工</Button>
                    <Button type="primary" style={{ marginLeft: 10 }}>员工详情</Button>
                    <Button type="danger" icon={<DeleteOutlined/>} style={{ marginLeft: 10 }}>删除员工</Button>
                </Card>
                <div className="content-wrap">
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <ETable
                                    columns={columns}
                                />
                            </Spin> :
                            <ETable
                                columns={columns}
                                dataSource={dataSource.list}
                                pagination={pagination}
                                selectedRowKeys={selectedRowKeys}
                                rowSelection={{
                                    type: "radio",
                                    selectedRowKeys
                                }}
                                updateParamsToState={untils.updateParamsToState.bind(this)}
                            />
                    }
                </div>

            </div >
        )
    }
}
