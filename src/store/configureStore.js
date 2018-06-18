import { createStore, combineReducers } from 'redux';
import historyReducer from '../reducers/history';

export default () => {

    const store = createStore(
        combineReducers({
            history: historyReducer
            }),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    return store;
}