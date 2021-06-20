import React, { Component } from 'react'
import { Form, Card, Input, Button, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload,Checkbox } from 'antd'
import {PlusOutlined,LoadingOutlined} from '@ant-design/icons'
import moment from 'moment'
import './../ui/style.less'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default class Login extends Component {
    state = {
        value: 1,
        imageUrl:null,
        loading:false
    }
    changeGender = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    render() {
        let { value,imageUrl } = this.state;
        const formItemLayout = {
            labelCol: {
                // labelCol和wrapperCol是成对出现的，labelCol设置的是label提示信息所占的栅格数，wrapperCol设置的是表单项所占的栅格数
                xs: 24,
                md: 4
            },
            wrapperCol: {
                xs: 24,
                md: 10
            }
        }
        const offsetLayout={
            wrapperCol:{
                xs:24,
                md:{
                    span:10,
                    offset:4
                }
            }
        }
        const dateFormat = "YYYY/MM/DD"
        //自定义初始化的时间字符串的格式
        const uploadButton=(
           <div>
               {this.state.loading?<LoadingOutlined/>:<PlusOutlined/>}
               <div>Upload</div>
           </div>
        )
        return (
            <div style={{width:"100%"}}>
                <Card title="注册表单" className="button-wrap">
                    <Form>
                        <Form.Item label="用户名" {...formItemLayout}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="密码" {...formItemLayout}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="性别" {...formItemLayout} war>
                            <Radio.Group value={value} onChange={this.changeGender}>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="年龄" {...formItemLayout}>
                            <InputNumber />
                        </Form.Item>
                        <Form.Item label="当前状态" {...formItemLayout}>
                            <Select defaultValue="龙鸣">
                                <Select.Option value="龙鸣">龙鸣</Select.Option>
                                <Select.Option value="孤儿">孤儿</Select.Option>
                                <Select.Option value="铁憨憨">铁憨憨</Select.Option>
                                <Select.Option value="哈麻批">哈麻批</Select.Option>
                                <Select.Option value="弱智">弱智</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="爱好" {...formItemLayout}>
                            <Select defaultValue={["弹吉他", "架子鼓"]} mode="multiple">
                                <Select.Option value="唱歌">唱歌</Select.Option>
                                <Select.Option value="架子鼓">架子鼓</Select.Option>
                                <Select.Option value="贝斯">贝斯</Select.Option>
                                <Select.Option value="尤克里里">尤克里里</Select.Option>
                                <Select.Option value="弹吉他">弹吉他</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="是否已婚" {...formItemLayout}>
                            <Switch />
                        </Form.Item>
                        <Form.Item label="生日" {...formItemLayout}>
                            <DatePicker defaultValue={moment("1998/10/27", dateFormat)} format={dateFormat} />
                        </Form.Item>
                        <Form.Item label="联系地址" {...formItemLayout}>
                            <Input.TextArea autoSize={{ minRows: 4 }} />
                        </Form.Item>
                        <Form.Item label="早起时间" {...formItemLayout}>
                            <TimePicker
                                defaultValue={moment("9:00:00", "HH:mm:ss")}
                            />
                        </Form.Item>
                        <Form.Item label="头像" {...formItemLayout}>
                            <Upload
                                listType="picture-card"
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                onChange={this.handleChange}
                                showUploadList="false"
                            >
                                {imageUrl?<img src={imageUrl} alt=""/>:uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Checkbox>我已经阅读过<a href="#">6324协议</a></Checkbox>
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary">注册</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}
