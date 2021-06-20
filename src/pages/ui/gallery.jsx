import React, { Component } from 'react'
import { Card, Row, Col, Modal } from 'antd'


import './style.less'
const { Meta } = Card;
const imgs = [
    ["1.png", "2.png", "3.png", "4.png", "5.png"],
    ["6.png", "7.png", "8.png", "9.png", "10.png"],
    ["11.png", "12.png", "13.png", "14.png", "15.png"],
    ["16.png", "17.png", "18.png", "19.png", "20.png"],
    ["21.png", "22.png", "23.png", "24.png", "25.png"]
]


export default class Loading extends Component {
    state = {
        imgUrl: null,
        showImg: false
    }
    handleGallery = (imgUrl) => {
        this.setState({
            imgUrl,
            showImg: true
        })
    }
    handleCancel = () => {
        this.setState({
            showImg: false
        })
    }
    imgsList = () => {
        return (
            imgs.map(value => {
                return (
                    <Col md={5} >
                        {value.map(value => {
                            let imgUrl = require(`./../../resource/gallery/${value}`).default;
                            return (
                                <Card
                                    style={{ marginBottom: "10px" }}
                                    cover={<img src={imgUrl} onClick={() => this.handleGallery(imgUrl)} />}
                                >
                                    <Meta title="给老子爬" description="你是不是龙鸣？" />
                                </Card>
                            )
                        })}
                    </Col>
                )
            })
        )
    }
    render() {
        let { imgUrl, showImg } = this.state;
        return (
            <div style={{width:"100%"}}>
                <Row gutter={10} style={{flexFlow:"none"}}>
                    { this.imgsList()}
                </Row>
                <Modal
                    visible={showImg}
                    footer={null}
                    onCancel={this.handleCancel}
                    width={350}
                >
                    <img src={imgUrl} alt="" style={{ marginTop: "20px", width: "100%" }} />
                </Modal>
            </div>
        )
    }
}
