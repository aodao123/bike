import React, { Component } from 'react'
import { Card, Tabs, message } from 'antd'
import { CommentOutlined, DollarCircleOutlined, HomeOutlined } from '@ant-design/icons'

import './style.less'


const { TabPane } = Tabs;
export default class Loading extends Component {
    newTabIndex = 0;
    state = {
        panes: [
            { title: "Tab 1", key: "1", content: "你仔细想想你的功课学好了吗" },
            { title: "Tab 2", key: "2", content: "你的同学别人可能在秉烛夜游" },
            { title: "Tab 3", key: "3", content: "你天天就在那给你网恋的对象发消息" },
        ],
        activeKey: 1
    }
    showMessage = (key) => {
        message.info(`你选择了第${key}个tab页`)
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        const newPanes = [...panes];
        newPanes.push({ title: '新标签页', content: '新标签页内容', key: activeKey });
        this.setState({
            panes: newPanes,
            activeKey,
        });
    };

    remove = targetKey => {
        const { panes, activeKey } = this.state;
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        this.setState({
            panes: newPanes,
            activeKey: newActiveKey,
        });
    };
    render() {
        let { panes } = this.state;
        return (
            <div style={{width:"100%"}}>
                <Card className="button-wrap" title="tab页签">
                    <Tabs defaultActiveKey="2" onChange={this.showMessage}>
                        <TabPane tab="Tab 1" key="1">
                            睡觉睡到他妈的课都不去上
                        </TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>
                            一下午就在那打游戏
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            晚上就在那看直播
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className="button-wrap" title="带图标的tab页签">
                    <Tabs defaultActiveKey="1" onChange={this.showMessage}>
                        <TabPane tab={<span><CommentOutlined /> Tab 1</span>} key="1">
                            一天三顿都在寝室里面
                        </TabPane>
                        <TabPane tab={<span><DollarCircleOutlined />Tab 2</span>} key="2">
                            还是叫同一个寝室的室友给你们带饭的
                        </TabPane>
                        <TabPane tab={<span><HomeOutlined />Tab 3</span>} key="3">
                            你不是懒狗啊
                        </TabPane>
                    </Tabs>
                </Card>
                <Card className="button-wrap" title="可关闭的的tab页签">
                    <Tabs
                        defaultActiveKey="1"
                        onChange={this.showMessage}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {panes.map(value => {
                            return (
                                <TabPane key={value.key} tab={value.title} >{value.content}</TabPane>
                            )
                        })}
                    </Tabs>
                </Card>

            </div>
        )
    }
}
