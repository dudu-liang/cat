
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/pushAction';
import { Link } from 'react-router-dom';

import Tip from '../common/Tip';

import './push.css';

class PushView extends React.Component {

    constructor (props) {
        
        super(props);

    }


    componentDidMount () {

        let {actions,location} = this.props;
        let search = location.search;
            if(search && search != "") {
                actions.getDetail(search.substring(4));
            }
    }

    render () {

        let { history,push,actions,location } = this.props;

        let show = push.image == "" ? push.show : push.image;

        return <div className="push-view">
                  <Tip status = {push.tipStatus} message = {push.tipMessage}/>

                  <div className="push-one push-photobox" style={{"backgroundImage":"url(" + show + ")"}}>
                      <span className="push-photo">猫咪证件照</span>
                      <input type="file" className="file" name="image" onChange={actions.onChangeFile.bind(this)} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="联系人" name="name" className="inp" value={push.name}  onChange={actions.onChangeData} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="微信号或填保密，手机号微信号至少填一个" name="weixin" className="inp" value={push.weixin} onChange={actions.onChangeData} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="手机号或填保密，手机号微信号至少填一个" name="phone" className="inp" value={push.phone} onChange={actions.onChangeData} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="猫咪所在地址" name="address" className="inp" value={push.address} onChange={actions.onChangeData} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="品种" name="type" className="inp" value={push.type} onChange={actions.onChangeData} />
                  </div>

                  <div className="push-line">
                     <input type="text" placeholder="价格，免费填0" name="price"  className="inp" value={push.price} onChange={actions.onChangeData} />
                  </div>

                  <div className="push-one">
                     <span className="push-name">猫咪性别:</span>
                     <select name="sex" id="sex" className="sel" value={push.sex} onChange={actions.onChangeData}>
                        <option value="boy">男孩纸</option>
                        <option value="girl">女孩纸</option>
                     </select>
                  </div>

                  <div className="push-one">
                     <span className="push-name">猫咪年龄:</span>
                     <select  name="age"  name="age" className="sel" value={push.age} onChange={actions.onChangeData}>
                        <option value="不清楚">不清楚</option>
                        <option value="1个月">1个月</option>
                        <option value="2个月">2个月</option>
                        <option value="3个月">3个月</option>
                        <option value="4个月">4个月</option>
                        <option value="5个月">5个月</option>
                        <option value="6个月">6个月</option>
                        <option value="7个月">7个月</option>
                        <option value="8个月">8个月</option>
                        <option value="9个月">9个月</option>
                        <option value="10个月">10个月</option>
                        <option value="11个月">11个月</option>
                        <option value="1岁">1岁</option>
                        <option value="1岁半">1岁半</option>
                        <option value="2岁">2岁</option>
                        <option value="3岁">3岁</option>
                        <option value="3岁以上">3岁以上</option>
                     </select>
                  </div>

                  <div className="push-one">
                     <span className="push-name">配送方式:</span>
                     <select name="sendType" className="sel" value={push.sendType} onChange={actions.onChangeData}>
                        <option value="自提">自提</option>
                        <option value="送货上门">送货上门</option>
                     </select>
                  </div>

                  <div className="push-one">
                     <span className="push-name">疫苗:</span>
                     <select name="yimiao" className="sel" value={push.yimiao} onChange={actions.onChangeData}>
                        <option value="不清楚">不清楚</option>
                        <option value="接种过">接种过</option>
                        <option value="没接种过">没接种过</option>
                     </select>
                  </div>

                  <div className="push-one">
                     <span className="push-name">驱虫:</span>
                     <select name="quchong" className="sel" value={push.quchong} onChange={actions.onChangeData}>
                        <option value="不清楚">不清楚</option>
                        <option value="驱虫过">驱虫过</option>
                        <option value="没驱过虫">没驱过虫</option>
                     </select>
                  </div>

                  <div className="push-one">
                     <span className="push-name">绝育:</span>
                     <select name="sterilisation" className="sel" value={push.sterilisation} onChange={actions.onChangeData}>
                        <option value="否">否</option>
                        <option value="已绝育">已绝育</option>
                        <option value="不清楚">不清楚</option>
                     </select>
                  </div>

                  <button type="button" className="push-btn" onClick={actions.onPushClick.bind(this,history,location)}>
                     确认发布
                  </button>

               </div>
    }

}

const mapStateToProps = state => ({
    push: state.push
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PushView);