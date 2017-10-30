import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/userAction';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Tip from '../common/Tip';

import './user.css';

class UserView extends React.Component {

    constructor (props) {
        
        super(props);

    }

    componentDidMount () {

        let {actions,history} = this.props;

        actions.getUser(history);
           
    }

    render () {

        let {user,actions,history} = this.props;

        return <div className="user-content">

                 <Tip status = {user.tipStatus} message = {user.tipMessage}/>

                  <div className="wid-100 white-bg">
                     <div className="user-box">
                            <p className="user-head"></p>
                            <p className="user-name">{user.userName}</p>
                     </div>
                  </div>

                  <div className="user-line">
                     <Link to="/publish">
                        我发布的
                        <img src="http://fe.c360dn.com/operation-activity/eight/right-arrow.png" className="user-arrow"/>
                     </Link>
                  </div>

                  <div className="user-line">
                    <Link to="/collect">
                        我收藏的
                        <img src="http://fe.c360dn.com/operation-activity/eight/right-arrow.png" className="user-arrow"/>
                    </Link>
                  </div>

                  {
                      user.type == "admin" ? <div className="user-line">
                            <Link to="/collect">
                                管理发布信息
                                <img src="http://fe.c360dn.com/operation-activity/eight/right-arrow.png" className="user-arrow"/>
                            </Link>
                        </div>  : null
                  }

                  <div className="log-out" onClick={actions.logOut.bind(this,history)}>退出登录</div>
               </div>
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserView);