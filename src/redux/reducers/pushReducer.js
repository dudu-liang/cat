
import {fromJS} from 'immutable';

let initState = {
  tipMessage : "",
  tipStatus : false,
  isPushing : false,
  name : "",
  weixin : "",
  phone : "",
  address : "",
  type : "",
  sex : "boy",
  age : "不清楚",
  price : "",
  sendType : "自提",
  yimiao : "不清楚",
  quchong : "不清楚",
  image : "",
  show : "",
  showName : "",
  sterilisation : "否"
}

export default (state = initState,action) => {

    switch(action.type) {
      
      case 'push/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'push/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();

      case 'push/CHANGE_DATA' : 
      return fromJS(state).set(action.payload.name,action.payload.value).toJS();

      case 'push/SUCCESS' : 
      return fromJS(state).set('isPushing', false)
                          .set('tipStatus',true)
                          .set('tipMessage',"发布成功").toJS();

      case 'push/FAIL' : 
      return fromJS(state).set('isPushing', false).toJS();

      case 'push/CHANGE_FILE' : 
      return fromJS(state).set('show',action.payload.show)
                          .set('showName',action.payload.showName)
                          .set('image',action.payload.image).toJS();

      case 'push/SETDATA' : 
      return fromJS(state).set('name',action.payload.name)
                          .set('show',action.payload.show)
                          .set('releaseTime',action.payload.releaseTime)
                          .set('userName',action.payload.userName)
                          .set('weixin',action.payload.weixin)
                          .set('phone',action.payload.phone)
                          .set('address',action.payload.address)
                          .set('type',action.payload.type)
                          .set('price',action.payload.price)
                          .set('sex',action.payload.sex)
                          .set('age',action.payload.age)
                          .set('sendType',action.payload.sendType)
                          .set('yimiao',action.payload.yimiao)
                          .set('quchong',action.payload.quchong)
                          .set('sterilisation',action.payload.sterilisation)
                          .toJS();

      default :
      return state;
    }

    

}