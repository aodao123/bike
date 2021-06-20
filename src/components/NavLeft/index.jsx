import React, { Component } from 'react'
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux'
import {switchMenu} from './../../redux/action/index'
import './style.less'
import menuConfig from './../../config/menuConfig'

const { SubMenu } = Menu;

class NavLeft extends Component {
    state={}
    renderMenu(data) {
        return (
            data.map(value => {
                if (value.children) {
                    return (
                        <SubMenu key={value.key} title={value.title}>{this.renderMenu(value.children)}</SubMenu>
                    )
                }
                return (
                    <Menu.Item key={value.key} title={value.title}>
                        <NavLink to={value.key}>{value.title}</NavLink>
                    </Menu.Item>
                )
            })
        )
    }
    handleClick=(item)=>{
        // 点击更新store中的头部组件标题
        const {dispatch}=this.props
        const menuTitle=item.item.props.title
        dispatch(switchMenu(menuTitle))
    }
    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="" />
                    <h1>Imooc MS</h1>
                </div>
                <Menu theme="dark" selectedKeys={window.location.pathname} onClick={this.handleClick}>
                    {/* 设置这个selectedKeys，可以让页面在刷新之后，菜单依然保持选中状态 */}
                    {this.renderMenu(menuConfig)}
                </Menu>
            </div>
        )
    }
}

export default connect()(NavLeft)