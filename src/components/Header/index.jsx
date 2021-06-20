import React, { Component } from 'react'
import { Row, Col } from 'antd'
import './style.less'
import until from './../../until/untils'
import axios from './../../axios/index'
import {connect} from 'react-redux'
import { configConsumerProps } from 'antd/lib/config-provider'

class Header extends Component {

    state = {
        userName: "孙笑川258"
    }
    getWeatherApiData() {
        axios.jsonp({
            url: "https://tianqiapi.com/api?version=v1&appid=59896916&appsecret=QCqov1fT"
        }).then(res => {
            let city = res.city;
            let weatherDetail = res.data[0].wea;
            let tem = res.data[0].tem;
            this.setState({
                city, weatherDetail, tem
            })
        }).catch(error => {
            console.log(error.message)
        })
    }
    UNSAFE_componentWillMount() {
        setInterval(() => {
            let sysTime = until.formatDate(new Date().getTime())
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherApiData();
    }
    render() {
        let { sysTime, userName, city, weatherDetail, tem } = this.state;
        let { menuType ,menuName} = this.props;
        
        return (
            <div className="header-container">
                <Row className="top">
                    {
                        menuType ?
                            <Col span={4}>
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span className="logo-text">Imooc通用管理系统</span>
                            </Col> : ""
                    }
                    <Col span={menuType?20:24}>
                        <span>欢迎，{userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {menuType ? "" : <Row className="bottom">
                    <Col span={4} className="bottom-title">
                        <span>{menuName}</span>
                    </Col>
                    <Col span={20} className="bottom-weather">
                        <span className="date">{sysTime}</span>
                        <span className="weather">{city} {weatherDetail} {tem}</span>
                    </Col>
                </Row>}

            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    console.log(state.menuName)
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(Header)