import React, { Component } from 'react'
import { Card,notification,Button} from 'antd'

import './style.less'

export default class Loading extends Component {
    handleNotice=(type,direction)=>{
        if(direction){
            notification.config({
                placement:direction
            })
        }
        notification[type]({
            message:"起床了",
            description:"很多读带学的你们自己觉得自己是不是懒狗？",
        })
    }

    render() {

        return (
            <div style={{width:"100%"}}>
                <Card className="button-wrap">
                    <Button onClick={()=>this.handleNotice("success")}>success</Button>
                    <Button onClick={()=>this.handleNotice("info","bottomRight")}>info</Button>
                    <Button onClick={()=>this.handleNotice("warning","bottomLeft")}>warning</Button>
                    <Button onClick={()=>this.handleNotice("error","topLeft")}>error</Button>
                </Card>
            </div>
        )
    }
}
