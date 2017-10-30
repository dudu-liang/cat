import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../actions/publishAction';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Tip from '../common/Tip';
import './publish.css';

class PublishView extends React.Component {

    constructor (props) {
        
        super(props);

    }

    componentDidMount () {

        let {actions} = this.props;

        actions.getUser();
           
    }

    render () {

        let {publish,actions,history} = this.props;

        console.log(publish);

        return <div className="index-page">
                  <Header title={"我发布的"} />
                  <Tip status = {publish.tipStatus} message = {publish.tipMessage}/>
                  {
                        publish.list.map(function(item,index) {

                            let image = (item.show && item.show != "" )? item.show : item.image;

                            return <div className="index-item wid-100" key={"item" + index}>
                                        <div className="index-box" onClick={actions.pageDetail.bind(this,item.objectId,history)}>
                                            <div className="index-img" style={{"backgroundImage" : "url(" + image + ")"}}></div>
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
                                            <div className="publish-boxbtn">
                                               <button type="button" className="publish-edit" onClick={actions.pageEdit.bind(this,item.objectId,history)}>修改</button>
                                               <button type="button" className="publish-online" onClick={actions.changeStatus.bind(this,item.objectId,item.status)}>{item.status == 1 ? "下架" : "上架"}</button>
                                            </div>
                                        </div>
                                    </div>
                        })
                    }

                    {
                        (publish.list.length == 0 && publish.isLoading == false) ?
                            <div className="no-data">还没发布猫咪哦</div>
                        : null
                    }
               </div>
    }
}

const mapStateToProps = state => ({
    publish: state.publish
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishView);