
import {fromJS} from 'immutable';

let type = localStorage.getItem("type");

let initState = {
  "tipMessage" : "",
  "tipStatus" : false,
  "userName" : "",
  "type" : type
}

export default (state = initState,action) => {

    switch(action.type) {
      
      case 'user/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'user/USERNAME' :
      return fromJS(state).set('userName',action.payload).toJS();

      case 'user/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();
      
      default :
      return state;

    }

    

}