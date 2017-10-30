import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore,applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './redux/reducers';
import './App.css';

const store = createStore(reducer,applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <div className="App">
        哈哈哈哈
      </div>
    );
  }
}

export default App;
