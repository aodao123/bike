import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Header from './components/Header/index'
import './style/common.less'
import './components/Header/style.less'

export default class Common extends Component {
    render() {
        let { children } = this.props
        return (
            <div>
                <Row className="simple-page">
                    <Col span={24}>
                        <Header menuType="menuType"/>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className="content">
                        {children}
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        footer
                    </Col>
                </Row>
            </div>
        )
    }
}
