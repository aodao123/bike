import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'

import * as echarts from 'echarts/lib/echarts';// echarts按需加载
import 'echarts/lib/chart/bar'
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
            legend: {},//这个属性加上之后，鼠标滑到每个柱形图上面都会显示数据量
            tooltip: {},
            title: {
                text: "用户骑行订单"
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                // y轴对应的数据量
                data: [1000, 2000, 1500, 3000, 1700, 1100, 1300],
                type: 'bar'
            }]
        }
        return option
    }

    getOption2 = () => {
        let option = {
            title: {
                text: "用户骑行订单"
            },
            legend: {},//副标题，就是图表顶部的ofo、摩拜、小蓝
            tooltip: {},
            dataset: {
                source: [
                    ['product', 'ofo', '摩拜', '小蓝'],
                    ['周一', 433, 858, 937],
                    ['周二', 831, 734, 551],
                    ['周三', 864, 652, 825],
                    ['周四', 724, 539, 391],
                    ['周五', 649, 888, 467],
                    ['周六', 651, 164, 621],
                    ['周日', 614, 322, 455]
                ]
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [
                { type: 'bar' },
                { type: 'bar' },
                { type: 'bar' }
            ]
        };
        return option
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之二">
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />

                </Card>
            </div>
        )
    }
}
