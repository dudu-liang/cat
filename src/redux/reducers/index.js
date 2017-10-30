import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import indexReducer from './indexReducer';
import pushReducer from './pushReducer';
import detailReducer from './detailReducer';
import userReducer from './userReducer';
import publishReducer from './publishReducer';
import collectReducer from './collectReducer';

//合并reducers
const rootReducer = combineReducers({
    login : loginReducer,
    register : registerReducer,
    index : indexReducer,
    push : pushReducer,
    detail : detailReducer,
    user : userReducer,
    publish : publishReducer,
    collect : collectReducer
});

export default rootReducer;