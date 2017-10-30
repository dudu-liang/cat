import AV from 'leancloud-storage';

let actions = {

    getUser : function(history) {
       
        return function(dispatch,getState) {
            let username = AV.User.current();
            if(!username) {
                dispatch(actions.showMessage("还未登录哦"));
                setTimeout(() => {
                    history.push("./login");
                },1600);
            }else{
                let name = username.get("username");
                dispatch(actions.userName(name));
            }
        }
    },

    logOut : function(history) {

        return function() {
            AV.User.logOut();
            history.push("./login");
        }

    },

    hideTip : () => ({
        type : 'user/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'user/SHOWTIP',
        payload : message
    }),

    userName : (name) => ({
        type : 'user/USERNAME',
        payload : name
    }),

    showMessage : function(message) {
       
        return function(dispatch,getState) {
            dispatch(actions.showTip(message));
            setTimeout(() => {
                dispatch(actions.hideTip());
            },1500);
        }

    },

}

export default actions;