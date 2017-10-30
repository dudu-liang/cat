import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/detailAction';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import './detail.css';

class DetailView extends React.Component {

    constructor (props) {
        
        super(props);

    }

    componentDidMount () {

        let {location,actions} = this.props;
        let search = location.search;
            if(search && search != "") {
                actions.getDetail(search.substring(4));
            }
            
    }

    render () {

        let {detail,actions} = this.props;

        let phoneExp = /^1[3|4|5|8|7][0-9]\d{4,8}$/;

        return <div>
                  <Header title={"猫咪名片"}/> 
                  <div className="detail-box">
                     {
                         phoneExp.test(detail.phone) && detail.status == 1 ? <a href={"tel:" + detail.phone} className="detail-phone"></a> : null
                     }
                     
                     <img src={detail.show} className="detail-image"/>
                     <div className="detail-line">
                        <p>
                           联系人：{detail.name}
                        </p>
                        <p>
                           微信：{detail.weixin}
                        </p>
                        <p>
                           手机号：{detail.phone}
                        </p>
                        <p>
                           地址：{detail.address}
                        </p>
                        <p>
                           品种：{detail.type}
                        </p>
                        <p>
                           价格：{detail.price == 0 ? "免费" :  "￥" + detail.price}
                        </p>
                        <p>
                           性别：{detail.sex == "boy" ? "弟弟" : "妹妹"}
                        </p>
                        <p>
                           年龄：{detail.age == 100 ? "不清楚" : detail.age}
                        </p>
                        <p>
                           配送方式：{detail.sendType}
                        </p>
                        <p>
                           疫苗：{detail.yimiao}
                        </p>
                        <p>
                           驱虫：{detail.quchong}
                        </p>
                        <p>
                           绝育：{detail.sterilisation}
                        </p>
                     </div>
                  </div>

                  {
                      detail.status != 1 ? <div className="detail-status">已下架</div> : null
                  }
               </div>
    }
}

const mapStateToProps = state => ({
    detail: state.detail
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailView);