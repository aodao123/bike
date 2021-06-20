import React, { Component } from 'react'
import { Card,Button, message} from 'antd'

import './style.less'

export default class Loading extends Component {

    showMessage=(type)=>{
        message[type]("我是你哥哥")
    }
    render() {

        return (
            <div style={{width:"100%"}}>
                <Card className="button-wrap" title="全局弹窗">
                    <Button onClick={()=>this.showMessage("success")}>Success</Button>
                    <Button onClick={()=>this.showMessage("info")}>Info</Button>
                    <Button onClick={()=>this.showMessage("warning")}>Warning</Button>
                    <Button onClick={()=>this.showMessage("error")}>Error</Button>
                    <Button onClick={()=>this.showMessage("loading")}>Loading</Button>
                </Card>
            </div>
        )
    }
}
