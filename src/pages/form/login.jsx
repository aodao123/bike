import React, { Component } from 'react'
import { Form, Card, Input, Button,Checkbox } from 'antd'
import { UserOutlined,LockOutlined } from '@ant-design/icons'
import './../ui/style.less'


export default class Login extends Component {
    finish=(value)=>{
        let jsonData=JSON.stringify(value)
        // JSON.stringify()将js对象转化为json字符串
        console.log(jsonData)
    }
    render() {
        return (
            <div style={{width:"100%"}}>
                <Card title="行内表单" className="button-wrap">
                    <Form 
                        name="basic"
                        layout="inline" 
                        initialValues={{
                            remember:true
                        }}
                        onFinish={this.finish}
                    >
                        <Form.Item 
                            name="userName"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入用户名"
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined  />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item 
                            name="password"
                            rules={[
                                {
                                    required:true,
                                    message:"请输入密码"
                                }
                            ]}
                        >
                            <Input prefix={<LockOutlined  />} type="password" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="button-wrap">
                    <Form style={{width:"400px"}}>
                        <Form.Item>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
