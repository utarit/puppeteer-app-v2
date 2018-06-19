import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Provider} from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store/configureStore';
import {addRecord} from './actions/history';

const store = configureStore();

store.dispatch(addRecord({url: 'MarcoPolo.com', type: 'PDF', name: 'deli', createdAt: moment()}));

store.subscribe(() => {
    console.log(store.getState());
});

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
