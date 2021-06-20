import React, { Component } from 'react'
import { Alert, Card, Spin } from 'antd'
import { LoadingOutlined, } from '@ant-design/icons'
import './style.less'

export default class Loading extends Component {

    render() {

        return (
            <div style={{width:"100%"}}>
                <Card title="Spin用法" className="button-wrap">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={<LoadingOutlined />} />
                </Card>
                <Card title="内容遮罩" className="button-wrap">
                    <Alert message="阿米诺阿嫂" description="你是不是龙鸣？" type="info" />
                    <Spin>
                        <Alert message="阿米诺阿嫂" description="你是不是龙鸣？" type="error" />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert message="阿米诺阿嫂" description="你是不是龙鸣？" type="error" />
                    </Spin>
                    <Spin indicator={<LoadingOutlined />}>
                        <Alert message="阿米诺阿嫂" description="你是不是龙鸣？" type="error" />
                    </Spin>
                </Card>

            </div>
        )
    }
}
