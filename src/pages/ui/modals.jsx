import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './style.less'

export default class Modals extends Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }
    handleOpen = (param) => {
        this.setState({
            [param]: true
        })
    }
    handleConfirm(type) {
        Modal[type]({
            title: "确认？",
            content: "你确定吗？",
            onOk() {
                console.log("OK")
            },
            onCancel() {
                console.log("cancel")
            }
        })
    }
    render() {
        let { showModal1, showModal2, showModal3, showModal4 } = this.state;
        return (
            <div style={{width:"100%"}}>
                <Card title="基础模态窗" className="button-wrap">
                    <Button onClick={() => this.handleOpen("showModal1")}>Open</Button>
                    <Button onClick={() => this.handleOpen("showModal2")}>自定义页脚</Button>
                    <Button onClick={() => this.handleOpen("showModal3")}>顶部20px弹窗</Button>
                    <Button>水平垂直居中</Button>
                    <Modal title="React" visible={showModal1} onCancel={() => { this.setState({ showModal1: false }) }}>
                        <p>我是你哥哥，我们两个都是你妈的儿子</p>
                    </Modal>
                    <Modal title="React" visible={showModal2} onCancel={() => { this.setState({ showModal2: false }) }} okText="好的" cancelText="取消">
                        <p>我是你哥哥，我们两个都是你妈的儿子</p>
                    </Modal>
                    <Modal title="React" visible={showModal3} onCancel={() => { this.setState({ showModal3: false }) }} style={{ top: 20 }}>
                        <p>我是你哥哥，我们两个都是你妈的儿子</p>
                    </Modal>
                </Card>
                <Card title="信息确认框" className="button-wrap">
                    <Button onClick={() => this.handleConfirm("confirm")}>confirm</Button>
                    <Button onClick={() => this.handleConfirm("info")}>info</Button>
                    <Button onClick={() => this.handleConfirm("success")}>success</Button>
                    <Button onClick={() => this.handleConfirm("error")}>error</Button>
                    <Button onClick={() => this.handleConfirm("warning")}>warning</Button>
                </Card>

            </div>
        )
    }
}
