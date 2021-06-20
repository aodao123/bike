import React from 'react';
import ReactDOM from 'react-dom';
import BaseRouter from './router'
import { Provider } from 'react-redux'
import createStore from './redux/store/index'

const store=createStore()

ReactDOM.render(
  <Provider store={store}>
    <BaseRouter />
  </Provider>
  ,
  document.getElementById('root')
);


