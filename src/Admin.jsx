import React, { Component } from 'react'
import {Row,Col} from 'antd'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'

export default class Admin extends Component {
    render() {
        let {children}=this.props;
        return (
            <Row className="container">
                <Col span={3} className="left">
                    <NavLeft/>
                </Col>
                <Col span={21} className="main">
                    <Header/>
                    <Row className="content">
                        <Col span={24}>
                            {/* 解决每个组件的根标签div不独占一行的问题 */}
                            {children}
                        </Col>
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}
