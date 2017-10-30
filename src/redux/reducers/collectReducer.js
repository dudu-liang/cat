
import {fromJS} from 'immutable';

let initState = {
  "tipMessage" : "",
  "tipStatus" : false,
  "isLoading" : true,
  "list" : []
}

export default (state = initState,action) => {

    switch(action.type) {
      
      case 'collect/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'collect/CHANGE_LIST' :
      return fromJS(state).set('list',action.payload)
                          .set('isLoading',false).toJS();

      case 'collect/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();
      
      default :
      return state;

    }

}