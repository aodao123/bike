import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'

import * as echarts from 'echarts/lib/echarts';// echarts按需加载
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {
    componentDidMount() {
        echarts.registerTheme("Imooc", echartTheme);
    }

    getOption = () => {
        let option = {
            title:{
                text:"用户骑行订单"
            },
            tooltip: {
                trigger: 'axis'
                //item是滑到点上显示，axis是垂直坐标轴方向在一条线上就显示
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
        };
        return option
    }

    getOption2 = () => {
        let option = {
            title: {
                text: '折线图堆叠'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['ofo', '摩拜']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            // toolbox: {
            //     feature: {
            //          //可以设置下载该图
            //         saveAsImage: {}
            //     }
            // },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'ofo',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '摩拜',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        };
        return option
    }
    getOption3=()=>{
        let option = {
            tooltip:{
                trigger:"axis"
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        };
        return option
    }

    render() {
        return (
            <div>
                <Card title="折线图之一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="折线图之二">
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="折线图之二">
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
