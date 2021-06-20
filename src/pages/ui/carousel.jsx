import React, { Component } from 'react'
import { Carousel, Card } from 'antd'


import './style.less'

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const imgStyle={
    dispaly:"block",
    width:"60%",
    margin:"0px auto"

}
export default class Carousels extends Component {

    render() {

        return (
            <div style={{width:"100%"}}>
                <Card title="文字轮播" className="button-wrap">
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>上班司马脸，开会司马脸</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>我是你哥哥，我们两个都是你妈的儿子</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>你吼那么大声干什么嘛</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>那你去物管啊，你再骂</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="button-wrap">
                    <Carousel autoplay>
                        <div>
                            <img style={imgStyle} src={require("./../../resource/carousel-img/carousel-1.jpg").default} alt="" />
                        </div>
                        <div>
                            <img style={imgStyle} src={require("./../../resource/carousel-img/carousel-2.jpg").default} alt="" />
                        </div>
                        <div>
                            <img style={imgStyle} src={require("./../../resource/carousel-img/carousel-3.jpg").default} alt="" />
                        </div>

                    </Carousel>
                </Card>
            </div>
        )
    }
}
