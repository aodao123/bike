import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../themeLight'

import * as echarts from 'echarts/lib/echarts';// echarts按需加载
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {
    componentDidMount() {
        echarts.registerTheme("Imooc", echartTheme);
    }
    getOption() {
        let option = {
            title: {
                text: '用户骑行订单',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter:'{a}:<br/>{b}:{c}({d}%)'
                //自定义鼠标滑到每个数据项上面显示的内容的样式
            },
            legend: {
                //legend配置副标题的
                orient: 'vertical',
                left: 'right',
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '60%',
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 635, name: '周六' },
                        { value: 1300, name: '周日' }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }
    getOption2 = () => {
        let option = {
            title:{
                text:"用户订单数据"
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '用户订单数据',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    //控制环形图内环和外环的大小
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            //设置鼠标移动到每个数据项，环中间显示数据项名
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 635, name: '周六' },
                        { value: 1300, name: '周日' }
                    ]
                }
            ]
        };
        return option
    }
    getOption3() {
        let option = {
            title: {
                text: '用户骑行订单',
                subtext: '纯属虚构',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                //legend配置副标题的
                orient: 'vertical',
                left: 'right',
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '70%',
                    data: [
                        { value: 1048, name: '周一' },
                        { value: 735, name: '周二' },
                        { value: 580, name: '周三' },
                        { value: 484, name: '周四' },
                        { value: 300, name: '周五' },
                        { value: 635, name: '周六' },
                        { value: 1300, name: '周日' }
                    ].sort((a,b)=>{
                        return a.value-b.value
                    }),
                    roseType:"radius",
                    //设置南丁格尔图样式
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }

    render() {
        return (
            <div>
                <Card title="柱形图表之一" >
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之二" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="柱形图表之三" style={{marginTop:10}}>
                    <ReactEcharts option={this.getOption3()} theme="Imooc" style={{ height: 500 }} />
                </Card>
            </div>
        )
    }
}
