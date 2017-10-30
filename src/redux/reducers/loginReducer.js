
import {fromJS} from 'immutable';

let initState = {
  email: "",
  password : "",
  isLoging : false,
  tipMessage : "",
  tipStatus : false
}

export default (state = initState,action) => {

    switch(action.type) {
      case 'login/CHANGE_PHONE' : 
      return  fromJS(state).set('email', action.payload).toJS();

      case 'login/CHANGE_PWD' : 
      return  fromJS(state).set('password', action.payload).toJS();

      case 'login/START_LOGINING' :
      return fromJS(state).set('isLoging', true).toJS();

      case 'login/SUCCESS' : 
      return fromJS(state).set('isLoging', false)
                          .set('tipStatus',true)
                          .set('tipMessage',"登录成功").toJS();
      
      case 'login/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'login/FAIL' : 
      return fromJS(state).set('isLoging', false).toJS();

      case 'login/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();

      default :
      return state;
    }

    

}