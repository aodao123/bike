import React, { Component } from 'react'
import { Card, Button, Form, Table, Input, Select, Modal, Spin, Radio,message } from 'antd'
import axios from './../../axios/index'





class FilterForm extends Component {
    upload = value => {
        console.log(value)
    }
    render() {
        return (
            
            <Form layout="inline" onFinish={this.upload}>
                <Form.Item label="城市" name="city_id">
                    <Select placeholder="全部" style={{ width: 80 }}>
                        <Select.Option key="">全部</Select.Option>
                        <Select.Option key="1">长沙</Select.Option>
                        <Select.Option key="2">常德</Select.Option>
                        <Select.Option key="3">岳阳</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="mode">
                    <Select placeholder="全部" style={{ width: 150 }}>
                        <Select.Option key="">全部</Select.Option>
                        <Select.Option key="1">指定停车点模式</Select.Option>
                        <Select.Option key="2">禁停区模式</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="运营模式" name="op_mode">
                    <Select placeholder="全部" style={{ width: 80 }}>
                        <Select.Option key="">全部</Select.Option>
                        <Select.Option key="1">自营</Select.Option>
                        <Select.Option key="2">加盟</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="加盟授权状态" name="auth_status">
                    <Select placeholder="全部" style={{ width: 100 }}>
                        <Select.Option key="">全部</Select.Option>
                        <Select.Option key="1">已授权</Select.Option>
                        <Select.Option key="2">未授权</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">查询</Button>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="reset">重置</Button>
                </Form.Item>
            </Form>
        )
    }
}

class OpenCityForm extends Component {
    cityForm=React.createRef()
    componentDidMount(){
        this.props.setMyForm(this.cityForm)
    }
    render() {
        const formLayout={
            labelCol:{
                md:6
            },
            wrapperCol:{
                md:13
            }
        }
        return (
            <Form ref={this.cityForm}>
                <Form.Item label="选择城市" name="city_id" {...formLayout} 
                rules={[
                    {
                        required:true,
                        message:"请选择城市"
                    }
                ]}>
                    <Select>
                        <Select.Option key="1">北京</Select.Option>
                        <Select.Option key="2">上海</Select.Option>
                        <Select.Option key="3">天津</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="运营模式" name="op_mode" {...formLayout} 
                rules={[
                    {
                        required:true,
                        message:"请选择运营模式"
                    }
                ]}>
                    <Radio.Group>
                        <Radio value="1">自营</Radio>
                        <Radio value="2">加盟</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="用车模式" name="mode" {...formLayout} rules={[
                    {
                        required:true,
                        message:"请选择用车模式"
                    }
                ]}
                >
                    <Radio.Group>
                        <Radio value="1">指定停车点模式</Radio>
                        <Radio value="2">禁停区模式</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        )
    }
}


export default class City extends Component {
    state = {
        dataSource: [],
        loading: false,
        showOpenCity: false
    }
    params = {
        page: 1
    }
    handleOpenCity = () => {
        this.setState({
            showOpenCity: true
        })
    }
    handleSubmit=()=>{
        let jsonData=this.cityForm.current.getFieldsValue()
        console.log(jsonData)
        axios.ajax({
            url:"/api/opencity",
            method:"get",
            params:{
                data:jsonData
            }
        }).then(res=>{
            message.success(res.msg)
            this.setState({showOpenCity:false})
        })
        
        this.requestData()
    }
    requestData = () => {
        this.setState({
            loading: true
        });
        axios.ajax({
            url: "/api/city",
            method: "get",
            params: {
                ...this.params
            }
        }).then(res => {
            this.setState({
                loading: false
            });
            res.data.list.map((value, index) => {
                value.key = index;
                return value
            })
            this.setState({
                dataSource: res.data.list,

            })
        }).catch(error => {
            Modal.error({
                title: "错误",
                content: error.message
            })
        })
    }
    componentDidMount() {
        this.requestData()
    }
    render() {
        const columns = [
            {
                title: "城市ID",
                dataIndex: "city_id"
            },
            {
                title: "城市名称",
                dataIndex: "city_name"
            },
            {
                title: "用车模式",
                dataIndex: "mode",
                render: mode => {
                    return mode == 1 ? "指定停车点模式" : "禁停区模式"
                }
            },
            {
                title: "运营模式",
                dataIndex: "op_mode",
                render: op_mode => {
                    return op_mode == 1 ? "自营" : "加盟"
                }
            },
            {
                title: "授权加盟商",
                dataIndex: "franchisee_name"
            },
            {
                title: "城市管理员",
                dataIndex: "city_admin",
                render: (city_admin) => {
                    // 返回的city_admin是数组类型，数组中的每个元素是对象s
                    return city_admin.map(value => {
                        return value.admin_name
                    }).join(",")
                }
            },
            {
                title: "城市开通时间",
                dataIndex: "open_time"
            },
            {
                title: "操作时间",
                dataIndex: "update_time"
            },
            {
                title: "操作人",
                dataIndex: "sys_user_name"
            }
        ]
        let { dataSource, loading, showOpenCity } = this.state;
        return (
            <div style={{ width: "100%" }}>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button onClick={this.handleOpenCity} type="primary">开通城市</Button>
                </Card>
                <div className="content-wrap">
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered
                                    columns={columns}
                                    dataSource={dataSource}
                                />
                            </Spin> :
                            <Table
                                bordered
                                columns={columns}
                                dataSource={dataSource}
                            />
                    }
                </div>
                <Modal
                    title="添加"
                    visible={showOpenCity}
                    onCancel={() => { this.setState({ showOpenCity: false }) }}
                    onOk={this.handleSubmit}
                    cancelText="取消"
                    okText="提交"
                >
                    <OpenCityForm setMyForm={cityForm=>this.cityForm=cityForm}/>
                </Modal>
            </div>
        )
    }
}
