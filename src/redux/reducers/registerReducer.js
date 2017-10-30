import {fromJS} from 'immutable';

let initState = {
  email: "",
  password : "",
  repassword : "",
  isLoging : false,
  tipMessage : "",
  tipStatus : false
}

export default (state = initState,action) => {

    switch(action.type) {
      case 'register/CHANGE_EMAIL' : 
      return  fromJS(state).set('email', action.payload).toJS();

      case 'register/CHANGE_PWD' : 
      return  fromJS(state).set('password', action.payload).toJS();

      case 'register/CHANGE_REPWD' : 
      return  fromJS(state).set('repassword', action.payload).toJS();

      case 'register/START_LOGINING' :
      return fromJS(state).set('isLoging', true).toJS();

      case 'register/SUCCESS' : 
      return fromJS(state).set('isLoging', false)
                          .set('tipStatus',true)
                          .set('tipMessage',"注册成功").toJS();
      
      case 'register/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'register/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();

      default :
      return state;
    }

    

}