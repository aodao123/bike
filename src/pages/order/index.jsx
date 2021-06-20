import React, { Component } from 'react'
import { Card, Button, Form, Table, Select, Modal, Spin, Radio, DatePicker, message } from 'antd'
import axios from './../../axios/index'
import untils from './../../until/untils'
import BaseForm from './../../components/BaseForm/index'
import ETabel from './../../components/ETable/index'


export default class City extends Component {
    state = {
        dataSource: [],
        loading: false,
        orderConfigVisible: false,
        selectedRowKeys: []
    }
    params = {
        current: 1
    }
    handleConfirm = () => {
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.error({
                title: "错误",
                content: "你都没选择订单，我怎么知道你要结束哪个订单？"
            })
            return
        }
        axios.ajax({
            url: "/api/order/ebike_info",
            method: "get",
            params: {
                id: 1
            }
        }).then(res => {
            this.setState({
                orderInfo: res.data,
                orderConfigVisible: true
            })
        }).catch(error => {
            console.log(error.message)
        })
    }
    handleFinishOrder = () => {
        let { selectedItem } = this.state;
        axios.ajax({
            url: "/api/order/finish_order",
            method: "get",
            params: {
                id: selectedItem.id
            }
        }).then(res => {
            message.success(res.msg)
            this.setState({
                orderConfigVisible: false,
                selectedRowKeys: [],
                selectedItem: null
            })
        }).catch(error => {
            console.log(error.message)
        })

        this.requestData()
    }
    openOrderDetail = () => {
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.error({
                title: "错误",
                content: "你是不是龙鸣啊？你要查看哪个订单你先选啊"
            })
            return
        }
        window.open(`/common/order/detail/${selectedItem.id}`, "_blank")
    }
    requestData = () => {
        axios.requestList(this, "/api/order/list", this.params)
    }
    onRowClick = (record, index) => {
        let selectedRowKeys = [index];
        this.setState({
            selectedRowKeys,
            selectedItem: record
        })
    }
    componentDidMount() {
        this.requestData()
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status) => {
                    let config = {
                        "1": "进行中",
                        "2": "临时锁车",
                        "3": "已完成"
                    }
                    return config[status]
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
        const formLayout = {
            labelCol: {
                md: 6
            },
            wrapperCol: {
                md: 10
            }
        }
        let { dataSource, loading, orderConfigVisible, orderInfo, selectedRowKeys, pagination } = this.state;
        const formData = {
            // 传给BaseForm用于生成的表单的数据
            layout: "inline",
            onFinish: (value) => {
                console.log(value)
            },
            list: [
                {
                    type: "SELECT",
                    label: "城市",
                    name: "city_id",
                    placeholder: "全部",
                    width: 80,
                    rules: null,
                    list: [
                        { key: "0", name: "全部" },
                        { key: "1", name: "长沙" },
                        { key: "2", name: "常德" },
                        { key: "3", name: "岳阳" }
                    ]
                },
                {
                    type: "DATEPICER",
                    name: "start_time",
                    placeholder: "请选择开始时间",
                    format: "YYYY/MM/DD HH:mm:ss",
                    showTime: true
                },
                {
                    type: "TEXT",
                    label: "~"
                },
                {
                    type: "DATEPICER",
                    name: "end_time",
                    placeholder: "请选择结束时间",
                    format: "YYYY/MM/DD HH:mm:ss",
                    showTime: true
                },
                {
                    type: "SELECT",
                    label: "订单状态",
                    name: "status",
                    placeholder: "全部",
                    width: 100,
                    rules: null,
                    list: [
                        { key: "0", name: "全部" },
                        { key: "1", name: "进行中" },
                        { key: "2", name: "临时锁车" },
                        { key: "3", name: "已完成" },
                    ]
                },
                {
                    type: "BUTTON",
                    htmlType: "submit",
                    buttonType: "primary",
                    label: "查询"
                },
                {
                    type: "BUTTON",
                    htmlType: "reset",
                    buttonType: "default",
                    label: "重置"
                }
            ]
        }
        return (
            <div style={{ width: "100%" }}>

                <Card>
                    <BaseForm formData={formData} />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDetail}>订单详情</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered
                                    columns={columns}
                                />
                            </Spin> :
                            <ETabel
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
                        // <Table
                        //     bordered
                        //     columns={columns}
                        //     dataSource={dataSource.list}
                        //     pagination={pagination}
                        //     rowSelection={{
                        //         type:"radio",
                        //         selectedRowKeys
                        //     }}
                        //     onRow={(record, index) => {
                        //         // record是以对象的形式，返回当前行中的数据
                        //         return {
                        //             onClick: () => { this.onRowClick(record, index) }
                        //         }
                        //     }}
                        // />
                    }
                </div>
                <Modal
                    title="结束订单"
                    visible={orderConfigVisible}
                    onCancel={() => {
                        this.setState({
                            orderConfigVisible: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                >
                    {orderInfo ? <Form>
                        <Form.Item label="车辆编号" {...formLayout}>
                            {orderInfo[0].bike_sn}
                        </Form.Item>
                        <Form.Item label="剩余电量" {...formLayout}>
                            {orderInfo[0].battery + "%"}
                        </Form.Item>
                        <Form.Item label="行程开始时间" {...formLayout}>
                            {orderInfo[0].start_time}
                        </Form.Item>
                        <Form.Item label="当前位置" {...formLayout}>
                            {orderInfo[0].location}
                        </Form.Item>
                    </Form> : ""}
                </Modal>
            </div>
        )
    }
}
