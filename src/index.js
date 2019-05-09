import React from 'react';
import './index.css';
import { App } from './components/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import { store } from './components/_helpers';
// const store=createStore(rootReducer,applyMiddleware(thunk));
// console.log(store.getState());
// setup fake backend
import { render } from 'react-dom';



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
// ReactDOM.render(

// <App />
// , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
