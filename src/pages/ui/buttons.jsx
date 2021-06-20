import React, { Component } from 'react'
import { Card, Button, Radio } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './style.less'

export default class Buttons extends Component {
    state = {
        loading: true,
        size:"default"
    }
    handleClickLoading = () => {
        if (this.state.loading) { 
            this.setState({ loading: false }) 
        } else { 
            this.setState({ loading: true }) 
        }
    }
    handleChange=(event)=>{
        this.setState({
            size:event.target.value
        })
    }
    render() {
        let { loading,size } = this.state;
        return (
            <div >
                <Card title="基础按钮" className="button-wrap">
                    <Button type="primary">primary</Button>
                    <Button type="link">link</Button>
                    <Button type="dashed">dashed</Button>
                    <Button type="ghost">ghost</Button>
                    <Button type="text">text</Button>
                    <Button type="default">default</Button>
                    <Button type="danger">danger</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title="图形按钮" className="button-wrap">
                    <Button icon={<PlusOutlined />}>添加</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />}>删除</Button>
                    <Button icon={<SearchOutlined />} shape="circle"></Button>
                </Card>
                <Card title="loading按钮" className="button-wrap">
                    <Button type="primary" loading={loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={loading}></Button>
                    <Button loading={loading}>确定</Button>
                    <Button shape="circle" loading={loading}></Button>
                    <Button type="primary" onClick={() => { this.handleClickLoading()}}>{loading ? "关闭" : "加载"}</Button>
                </Card>
                <Card title="按钮组">
                    <Button.Group>
                        <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                        <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Button.Group>
                </Card>
                <Card title="按钮尺寸" className="button-wrap">
                    <Radio.Group onChange={this.handleChange} value={size}>
                        {/* 必须使用这种绑定方式，不能使用()=>{this.handleChange()} */}
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={size}>primary</Button>
                    <Button type="dashed" size={size}>dashed</Button>
                    <Button size={size}>default</Button>
                    <Button type="danger" size={size}>danger</Button>
                </Card>
            </div>
        )
    }
}
