import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/collectAction';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Tip from '../common/Tip';
import './collect.css';

class CollectView extends React.Component {

    constructor (props) {
        
        super(props);

    }

    componentDidMount () {

        let {actions} = this.props;

        actions.getUser();
           
    }

    render () {

        let {collect,actions,history} = this.props;

        console.log(collect);

        return <div className="index-page">
                  <Header title={"我收藏的"} />
                  <Tip status = {collect.tipStatus} message = {collect.tipMessage}/>
                  {
                    collect.list.map(function(item,index) {

                            let image = (item.show && item.show != "" )? item.show : item.image;

                            return <div className="index-item wid-100" key={"item" + index}>
                                        <div className="index-box" onClick={actions.pageDetail.bind(this,item.objectId,history)}>
                                            <div className="index-img" style={{"backgroundImage" : "url(" + image + ")"}}>
                                                    <img src={item.isCollected == 1 ? "http://fe.c360dn.com/operation-activity/eight/col.png" : "http://fe.c360dn.com/operation-activity/eight/no-col.png"} className="col-btn" onClick={actions.changeCollect.bind(this,item.objectId,item.isCollected)} />
                                            </div>
                                            <div className="index-bottom">
                                                <p>
                                                    品种：{item.type}
                                                </p>
                                                <p>
                                                    年龄：{item.age == 100 ? "不清楚" : item.age}
                                                </p>
                                                <p>
                                                    性别：{item.sex == "boy" ? "弟弟" : "妹妹"}
                                                </p>
                                                <p>
                                                    地址：{item.address}
                                                </p>
                                                    <p>
                                                    发布时间：{item.releaseTime}
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }
                    {
                        (collect.list.length == 0 && collect.isLoading == false) ?
                            <div className="no-data">暂无收藏</div>
                        : null
                    }
                    <ul className="bottom">
                     <li className="push-to">
                        <p className="icon-box">
                           <img src="http://fe.c360dn.com/operation-activity/eight/index-icon1.png" />
                        </p>
                        <p className="index-text text-center">
                            <Link to="./index">首页</Link>
                        </p>
                     </li>
                  <li className="push-to">
                       <p className="icon-box">
                           <img src="http://fe.c360dn.com/operation-activity/eight/push-icon.png" />
                       </p>
                       <p className="index-text text-center">
                           <Link to="./push">发布</Link>
                       </p>
                  </li>
                  <li className="push-to">
                     <p className="icon-box">
                           <img src="http://fe.c360dn.com/operation-activity/eight/mine-icon1.png" />
                     </p>
                     <p className="index-text text-center">
                       <Link to="./user">我的</Link>
                     </p>
                  </li>
                    </ul>
               </div>
    }
}

const mapStateToProps = state => ({
    collect: state.collect
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectView);