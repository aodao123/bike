import React, { Component } from 'react'
import { Card } from 'antd'
import BaseForm from './../../components/BaseForm/index'
import axios from './../../axios/index'

export default class BikeMap extends Component {
    state = {
        total_count: ""
    }
    map = ""
    renderMap = (res) => {
        // 初始化地图
        let list = res.data.route_list;
        this.map = new window.BMapGL.Map('container');
        // 起点
        let gps1 = list[0].split(',');
        let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
        // 终点
        let gps2 = list[list.length - 1].split(',')
        let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);
        //    设置起点图标
        let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let bikeMarkerStart = new window.BMapGL.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);
        //    设置终点图标 
        let endPointIcon = new window.BMapGL.Icon('/assets/end_point.png', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        let bikeMarkerEnd = new window.BMapGL.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkerEnd);
        // 绘制车辆行驶路线 将起点和终点连接起来
        let routeList = [];
        list.forEach((item) => {
            let p = item.split(',');
            routeList.push(new window.BMapGL.Point(p[0], p[1]))//添加一个坐标点 经度和纬度
        })
        //   画线 画折线
        let polyLine = new window.BMapGL.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine);
        //绘制服务区 画一个区域图 蒙版
        let servicePointList = [];
        let serviceList = res.data.service_list;
        serviceList.forEach((item) => {
            servicePointList.push(new window.BMapGL.Point(item.lon, item.lat))
        })
        // 画折线图 连接坐标点 经度和纬度 Polygon用这个考科一实现蒙板
        let polyServiceLine = new window.BMapGL.Polyline(servicePointList, {
            strokeColor: '#090',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.6
        })
        this.map.addOverlay(polyServiceLine)
        // 添加地图中自行车所在位置图标
        let bikeList = res.data.bike_list;
        let bikeIcon = new window.BMapGL.Icon('assets/bike.jpg', new window.BMapGL.Size(36, 42), {
            imageSize: new window.BMapGL.Size(36, 42),
            anchor: new window.BMapGL.Size(18, 42)
        })
        bikeList.forEach((item) => {
            let p = item.split(',');
            let point = new window.BMapGL.Point(p[0], p[1]);
            let bikeMarker = new window.BMapGL.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
    }
    render() {
        const formData = {
            // 传给BaseForm用于生成的表单的数据
            layout: "inline",
            onFinish: (value) => {
                // 根据查询到的结果渲染地图数据
                axios.ajax({
                    url: "/api/map/bike_list",
                    method: "get",
                    params: {
                        ...value
                    }
                }).then(res => {
                    this.setState({
                        total_count: res.data.total_count
                    })
                    this.renderMap(res)
                })
            },
            list: [
                {
                    type: "SELECT",
                    label: "城市",
                    name: "city_id",
                    placeholder: "全部",
                    width: 80,
                    rules: null,
                    list: [
                        { key: null, name: "全部" },
                        { key: "1", name: "长沙" },
                        { key: "2", name: "常德" },
                        { key: "3", name: "岳阳" }
                    ]
                },
                {
                    type: "DATEPICER",
                    name: "start_time",
                    placeholder: "请选择开始时间",
                    format: "YYYY/MM/DD HH:mm:ss",
                    showTime: true
                },
                {
                    type: "TEXT",
                    label: "~"
                },
                {
                    type: "DATEPICER",
                    name: "end_time",
                    placeholder: "请选择结束时间",
                    format: "YYYY/MM/DD HH:mm:ss",
                    showTime: true
                },
                {
                    type: "SELECT",
                    label: "订单状态",
                    name: "status",
                    placeholder: "全部",
                    width: 100,
                    rules: null,
                    list: [
                        { key: null, name: "全部" },
                        { key: "1", name: "进行中" },
                        { key: "2", name: "临时锁车" },
                        { key: "3", name: "已完成" },
                    ]
                },
                {
                    type: "BUTTON",
                    htmlType: "submit",
                    buttonType: "primary",
                    label: "查询"
                },
                {
                    type: "BUTTON",
                    htmlType: "reset",
                    buttonType: "default",
                    label: "重置"
                }
            ]
        }
        let { total_count } = this.state;
        return (
            <div>
                <Card>
                    <BaseForm formData={formData} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{total_count}辆车</div>
                    <div id="container" style={{ height: 500 }}></div>
                </Card>
            </div>
        )
    }
}
