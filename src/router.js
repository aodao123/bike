import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import App from './App.jsx';
import Admin from './Admin.jsx'
import Nomatch from './pages/nomatch'
import Home from './pages/Home'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notification'
import Messages from './pages/ui/messages'
import Tabs from './pages/ui/tabs'
import Gallery from "./pages/ui/gallery"
import Carousel from './pages/ui/carousel'
import Login from './pages/form/login'
import Reg from './pages/form/reg'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './Common'
import OrderDetail from './pages/order/detail'
import User from './pages/user/index'
import BikeMap from './pages/map/index'
import Bar from './pages/charts/bar/index'
import Pie from './pages/charts/pie/index'
import Line from './pages/charts/line/index'
import Rich from './pages/rich/index'
import Permission from './pages/permission'

export default class BaseRoutuer extends Component {
    render() {
        return (
            <Router>
                {/* 有子组件的路由，为了使子路由生效，都要在组件中解构this.props.children */}
                <App>
                    <Switch>
                        <Route path="/common" render={() => {
                            return (
                                <Common>
                                    <Route path="/common/order/detail/:id" component={OrderDetail} />
                                </Common>
                            )
                        }} />
                        <Route path="/" render={() => {
                            return (
                                <Admin>
                                    <Switch>
                                        
                                        <Route path="/home" component={Home} />
                                        <Route path="/ui/buttons" component={Buttons} />                               
                                        <Route path="/ui/modals" component={Modals} />
                                        <Route path="/ui/loadings" component={Loading} />                               <Route path="/ui/notification" component={Notice} />                               <Route path="/ui/messages" component={Messages} />
                                        <Route path="/ui/tabs" component={Tabs} />
                                        <Route path="/ui/gallery" component={Gallery} />                               <Route path="/ui/carousel" component={Carousel} />                               <Route path="/form/login" component={Login} />
                                        <Route path="/form/reg" component={Reg} />
                                        <Route path="/table/basic" component={BasicTable} />
                                        <Route path="/table/high" component={HighTable} />
                                        <Route path="/city" component={City} />
                                        <Route path="/order" component={Order} />
                                        <Route path="/user" component={User} />
                                        <Route path="/bikeMap" component={BikeMap} />
                                        <Route path="/charts/bar" component={Bar} />
                                        <Route path="/charts/pie" component={Pie} />
                                        <Route path="/charts/line" component={Line} />
                                        <Route path="/rich" component={Rich} />
                                        <Route path="/permission" component={Permission} />
                                        <Redirect to="/home"/>
                                        <Route component={Nomatch} />
                                        
                                    </Switch>
                                </Admin>
                            )
                        }} />

                    </Switch>
                </App>
            </Router>
        )
    }
}
