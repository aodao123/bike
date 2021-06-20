import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reducer from './../reducer/index'

export default ()=>createStore(reducer,{},composeWithDevTools())
// 这里的箭头函数不能加{}，如果非要加，要写上return