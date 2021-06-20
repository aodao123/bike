import React, { Component } from 'react'
import { Card, Button, Form, Input, Select, Modal, message, Tree } from 'antd'
import utils from './../../until/untils'
import ETable from './../../components/ETable/index'
import axios from './../../axios/index'
import untils from './../../until/untils'
import treeData from './../../config/menuConfig'


const { Option } = Select

export default class Permission extends Component {
    state = {
        dataSource: {},
        isRoleVisible: false,
        isPermission: false
    }
    params = {
        current: 1
    }
    handleRole = () => {
        this.setState({
            isRoleVisible: true
        })
    }
    handleRoleSubmit = () => {
        console.log(this.roleForm.current)
        let data = this.roleForm.current.getFieldValue()
        axios.ajax({
            method: "get",
            url: "/api/role/create",
            params: {
                ...data
            }
        }).then(res => {
            this.setState({
                isRoleVisible: false
            })
            message.success(res.msg)
            this.requestList()
        })
        this.roleForm.current.resetFields()
        //清空表单
    }
    requestList = () => {
        axios.requestList(this, "/api/role/list", this.params)
    }
    handlePermission = () => {
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.error({
                title: "错误",
                content: "龙鸣啊，给你说了多少遍了先选你要改哪一条，爬！"
            })
            return
        }
        this.setState({
            isPermission: true,
            menuInfo:selectedItem.menus
        })
    }
    handlePermissionEditSubmit = () => {
        let {selectedItem,menuInfo}=this.state
        let data=this.permEditForm.current.getFieldValue()
        data.role_id=selectedItem.id;
        data.menus=menuInfo;
        axios.ajax({
            method:"get",
            url:"/api/role/create",
            params:{
                data
            }
        }).then(res=>{
            message.success(res.msg)
        })
        this.setState({
            isPermission:false
        })
        this.permEditForm.current.resetFields()
        this.requestList()
    }
    handleUserAuth=()=>{
        //用户授权
        let { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.error({
                title: "错误",
                content: "龙鸣啊，给你说了多少遍了先选你要改哪一条，爬！"
            })
            return
        }
        
    }
    getRoleUserList=(id)=>{
        axios.ajax({
            method:"get",
            url:"/api/role/user_list",
            pameams:{
                id
            }
        }).then(res=>{
            if(res){
                this.getAuthUserList(res.data)
            }
        })
    }
    getAuthUserList=(dataSource)=>{
        // 筛选目标用户
        const mockData=[]
        const targetKeys=[]
        if(dataSource && dataSource.length>0){
            for(let i=0;i<dataSource.length;i++){
                const data={
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name
                }
            }
        }
    }
    componentDidMount() {
        this.requestList()
    }
    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: utils.formatTime
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status == 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: utils.formatTime
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        let { dataSource, selectedRowKeys, pagination, isRoleVisible, isPermission, selectedItem,menuInfo } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleRole}>创建角色</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable
                        updateParamsToState={untils.updateParamsToState.bind(this)}
                        columns={columns}
                        dataSource={dataSource.list}
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys
                        }}
                        selectedRowKeys={selectedRowKeys}
                        pagination={pagination}
                    />
                </div>
                <Modal
                    visible={isRoleVisible}
                    title="创建角色"
                    onCancel={() => {
                        this.setState({ isRoleVisible: false })
                        this.roleForm.current.resetFields()
                    }}
                    onOk={this.handleRoleSubmit}
                >
                    <RoleForm setMyForm={form => this.roleForm = form} />
                </Modal>
                <Modal
                    visible={isPermission}
                    title="设置权限"
                    onCancel={() => {
                        this.setState({ isPermission: false })
                        this.permEditForm.current.resetFields()
                    }}
                    onOk={this.handlePermissionEditSubmit}
                >
                    <PermEditForm
                        detail_info={selectedItem}
                        menuInfo={menuInfo}
                        setMyForm={form => this.permEditForm = form}
                        patchMenuInfo={(checkedKeys)=>{
                            this.setState({
                                menuInfo:checkedKeys
                            })
                        }}
                    />
                </Modal>
                <Modal>

                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    submitForm = React.createRef()
    componentDidMount() {
        this.props.setMyForm(this.submitForm)
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        return (
            <Form layout="horizontal" ref={this.submitForm}>
                <Form.Item label="角色名称" {...formItemLayout} name="role_name">
                    <Input type="text" placeholder="请输入角色名称" />
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout} name="state">
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </Form.Item>
            </Form>
        );
    }
}

class PermEditForm extends Component {
    permEditForm = React.createRef()
    onCheck=(checkedKeys)=>{
        let {patchMenuInfo}=this.props;
        patchMenuInfo(checkedKeys)
    }
    componentDidMount() {
        this.props.setMyForm(this.permEditForm)
    }
    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 }
        };
        const { detail_info ,menuInfo} = this.props;
        let newTreeData=[{
            // 做一个全选出来
            title:"全选",
            key:"all",
            children:[
                ...treeData
            ]
        }]
        return (
            <div>
                <Form layout="horizontal" ref={this.permEditForm}>
                    <Form.Item label="角色名称" {...formItemLayout} name="role_name">
                        <Input type="text" placeholder={detail_info.role_name} disabled />
                    </Form.Item>
                    <Form.Item label="状态" {...formItemLayout} name="state">
                        <Select>
                            <Option value={1}>开启</Option>
                            <Option value={0}>关闭</Option>
                        </Select>
                    </Form.Item>
                </Form>
                <Tree
                    treeData={newTreeData}
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                />
            </div>
        );
    }
}