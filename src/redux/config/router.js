
import React,{Component} from 'react';
import {  Switch, Route ,Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory';
import LoginView from '../components/login/LoginView';
import RegisterView from '../components/register/RegisterView';
import IndexView from '../components/index/IndexView';
import PushView from '../components/push/PushView';
import DetailView from '../components/detail/DetailView';
import UserView from '../components/user/UserView';
import PublishView from '../components/publish/PublishView';
import CollectView from '../components/collect/CollectView';

const history = createHashHistory();

class RouterConfig extends Component {
    render () {
       return <Router  history={history}>
                  <Switch>
                     <Route path="/login" component={LoginView}/>
                     <Route path="/register" component={RegisterView}/>
                     <Route path="/index" component={IndexView}/>
                     <Route path="/push" component={PushView}/>
                     <Route path="/detail" component={DetailView}/>
                     <Route path="/user" component={UserView}/>
                     <Route path="/publish" component={PublishView}/>
                     <Route path="/collect" component={CollectView}/>
                     <Route path="/" component={IndexView}/>
                  </Switch>
              </Router>
    }
}

export default RouterConfig;