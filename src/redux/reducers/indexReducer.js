
import {fromJS} from 'immutable';

let initState = {
  tipMessage : "",
  tipStatus : false,
  isLoading : true,
  loadingStatus : false,
  last : false,
  list : []
}

export default (state = initState,action) => {

    switch(action.type) {
      
      case 'index/HIDETIP' : 
      return fromJS(state).set('tipStatus',false)
                          .set('tipMessage',"").toJS();

      case 'index/CHANGE_LIST' : 
      return fromJS(state).set('list',action.payload)
                          .set('isLoading',false)
                          .set('loadingStatus',false).toJS();

      case 'index/SHOWTIP' : 
      return fromJS(state).set('tipStatus',true)
                          .set('tipMessage',action.payload).toJS();

      case 'index/LOADINGSHOW' : 
      return fromJS(state).set('loadingStatus',true).toJS();

      case 'index/LOADINGHIDE' : 
      return fromJS(state).set('loadingStatus',false).toJS();

      case 'index/CHANGE_LAST' : 
      return fromJS(state).set('last',true).toJS();

      default :
      return state;
    }

    

}