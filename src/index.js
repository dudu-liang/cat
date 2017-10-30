
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers';

import './index.css';
import RouterView from './redux/config/router';
import registerServiceWorker from './registerServiceWorker';

//初始化AV
import AV from 'leancloud-storage';

AV.init({
    appId: "NmRYON2LMcRMw4bhi31syBRo-gzGzoHsz",
    appKey: "F2BqMvOu1GfrQ0kxiQgg6G1F"
})



const store = createStore(reducer,applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <RouterView />
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
