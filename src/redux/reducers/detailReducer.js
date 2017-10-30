
import {fromJS} from 'immutable';

let initState = {
  "tipMessage" : "",
  "tipStatus" : false,
  "name" : "",
  "show" : "",
  "releaseTime" : "",
  "userName" : "",
  "weixin" : "",
  "phone" : "",
  "address" : "",
  "type" : "",
  "price" : "",
  "sex" : "",
  "age" : "",
  "sendType" : "",
  "yimiao" : "",
  "quchong" : "",
  "status" : 1,
  "sterilisation" : ""
}

export default (state = initState,action) => {

    switch(action.type) {
      
      case 'detail/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'detail/SETDATA' : 
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
                          .set('status',action.payload.status)
                          .set('sterilisation',action.payload.sterilisation)
                          .toJS();
      
      default :
      return state;

    }

    

}