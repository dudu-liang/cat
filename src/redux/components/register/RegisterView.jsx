
import  React  from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import actions from '../../actions/registerAction';
import Tip from '../common/Tip';
import './register.css';

class RegisterView extends React.Component {

    render () {

        let {register,actions,history } = this.props;

        return <div>
            <Tip status = {register.tipStatus} message = {register.tipMessage}/>
            <Header title={"注册"} />

            <div className="line margin-top-10">
                   <span className="name">邮箱:</span>
                   <input type="text" className="inp phone" placeholder="请输入邮箱"  onChange = {actions.changeEmail}   />
            </div>

            <div className="line">
                   <span className="name">密码:</span>
                   <input type="password" className="inp phone" placeholder="请输入密码" onChange = {actions.changePwd}   />
            </div>

            <div className="line">
                   <span className="name">确认密码:</span>
                   <input type="password" className="inp phone" placeholder="请再次输入确认密码" onChange = {actions.changeRePwd}  />
            </div>

            <div className="line">
                <button type="button" className="login-btn" onClick={actions.onRegisterClick.bind(this,history)}>注册</button>
                <div className="go-page">
                    <Link to="/login">已有账号?去登录</Link>
                </div>
            </div>

        </div>
    }
}

const mapStateToProps = state => ({
    register: state.register
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);

