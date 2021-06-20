import React, { Component } from 'react'
import { Button, Form, Input, Select, DatePicker } from 'antd'

export default class BaseForm extends Component {
    baseForm = React.createRef()
    initFromList = () => {
        const { formData } = this.props;
        const formList = formData.list
        let formItemList = []
        if (formList && formList.length > 0) {
            formList.forEach((value, index) => {
                let { type, label, name, placeholder, width, rules, list, htmlType, buttonType, format, showTime,inputType } = value;
                switch (type) {
                    case "SELECT":
                        const SELECT = <Form.Item name={name} label={label} key={index}>
                            <Select placeholder={placeholder} style={{ width: width }}>
                                {list.map((value, index) => {
                                    return <Select.Option key={value.key}>
                                        {value.name}
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        formItemList.push(SELECT)
                        break;
                    case "BUTTON":
                        const BUTTON = <Form.Item key={index}>
                            <Button htmlType={htmlType} type={buttonType}>
                                {label}
                            </Button>
                        </Form.Item>
                        formItemList.push(BUTTON)
                        break;
                    case "DATEPICER":
                        const DATEPICER = <Form.Item key={index}>
                            <DatePicker placeholder={placeholder} format={format} showTime={showTime} />
                        </Form.Item>
                        formItemList.push(DATEPICER)
                        break;
                    case "TEXT":
                        const TEXT = <Form.Item key={index}>
                            {label}
                        </Form.Item>
                        formItemList.push(TEXT)
                        break;
                    case "INPUT":
                        const INPUT = <Form.Item name={name} rules={rules} key={index}>
                            <Input placeholder={placeholder} type={inputType}/>
                        </Form.Item>
                        formItemList.push(INPUT)
                        break;
                }
            })
        }
        return formItemList
    }
    render() {
        const { formData } = this.props;
        const { layout, onFinish } = formData;
        return (
            <Form ref={this.baseForm} layout={layout} onFinish={onFinish}>
                {this.initFromList()}
            </Form>
        )
    }
}
