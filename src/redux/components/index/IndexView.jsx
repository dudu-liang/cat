
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/indexAction';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Tip from '../common/Tip';
import LoadingView from '../common/LoadingView';
import SwiperView from '../common/SwiperView';

import './index.css';


class IndexView extends React.Component {

    constructor(props) {

        super(props);

    }

    componentDidMount () {

       let {index,actions} = this.props;

            actions.getList();

    }

    render () {

        let {index,actions,history} = this.props;

        return <div className="index-page">
                     <Tip status = {index.tipStatus} message = {index.tipMessage}/>
                     <LoadingView status = {index.loadingStatus} />
                     <SwiperView />
                        {
                            index.list.map(function(item,index) {

                                let image = (item.show && item.show != "" )? item.show : item.image;

                                return <div className="index-item wid-100" key={"item" + index}>
                                            <div className="index-box" onClick={actions.pageDetail.bind(this,item.objectId,history)}>
                                                <div className="index-img" style={{"backgroundImage" : "url(" + image + ")"}}>
                                                    <img src={item.isCollected === 1 ? "http://fe.c360dn.com/operation-activity/eight/col.png" : "http://fe.c360dn.com/operation-activity/eight/no-col.png"} className="col-btn" onClick={actions.changeCollect.bind(this,item.objectId,item.isCollected,history)} />
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
                            (index.list.length === 0 && index.isLoading === false) ?
                                <div className="no-data">暂无猫咪</div>
                            : <div className="more-data" onClick={actions.getList}>{index.isLoading === false ? index.last == false ? "加载更多" : "已经到底啦" : null}</div>
                        }

                 <ul className="bottom">
                   <li>
                     <p className="icon-box">
                         <img src="http://fe.c360dn.com/operation-activity/eight/index-icon1.png" />
                     </p>
                     <p className="index-text text-center">
                        首页
                     </p>
                   </li>
                   <li className="push-to" onClick={actions.pagePush.bind(this,history)}>
                        <p className="icon-box">
                            <img src="http://fe.c360dn.com/operation-activity/eight/push-icon.png" />
                        </p>
                        <p className="index-text text-center">
                            发布
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
    index: state.index
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexView);