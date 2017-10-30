import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/loginAction';
import { Link } from 'react-router-dom';

import Header from '../common/Header';
import Tip from '../common/Tip';

import './login.css';

class LoginView extends React.Component {

    render () {

        let { login,actions,history } = this.props;
        
        return <div>

                <Tip status = {login.tipStatus} message = {login.tipMessage}/>
                <Header title={"登录"} />

                <div className="line margin-top-10">
                   <span className="name">邮箱:</span>
                   <input type="text" className="inp phone" placeholder="请输入邮箱" onChange = {actions.changePhone}  />
                </div>

                <div className="line">
                   <span className="name">密码:</span>
                   <input type="password" className="inp pwd" placeholder="请输入密码" onChange = {actions.changePwd} />
                </div>

                <div className="line">
                   <button type="button" className="login-btn" onClick={actions.onLoginClick.bind(this,history)}>登录</button>
                   <div className="go-page">
                        <Link to="/register">还没有账号?去注册</Link>
                   </div>
                </div>
              </div>
    }
}


const mapStateToProps = state => ({
    login: state.login
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
