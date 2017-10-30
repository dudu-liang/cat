import AV from 'leancloud-storage';

let actions = {

    onLoginClick : function(history) {

        return function(dispatch, getState) {
            let data = getState().login;
            let isLoging = data.isLoging;
            let email = data.email;
            let pwd = data.password;

                if(!email || email == "") {
                    dispatch(actions.showMessage("请输入邮箱"));
                    return;
                }

                if(!pwd || pwd == "") {
                    dispatch(actions.showMessage("请输入密码"));
                    return;
                }

                if(isLoging) { //正在登陆
                    return;
                }
                dispatch(actions.startLogin());
                AV.User.logIn(email, pwd).then(function (loginedUser) {
                    let userId = loginedUser.id;
                    let type = loginedUser.get('type');
                        localStorage.setItem("type",type);
                        localStorage.setItem("userId",userId);
                        dispatch(actions.successLogin());
                        setTimeout(() => {
                            dispatch(actions.hideTip());  
                            history.push("./index");
                        },1500);
                }, function (error) {
                    dispatch(actions.failLogin());
                    dispatch(actions.showMessage("登陆失败"));
                });
        }
            
    },

    showMessage : function(message) {
       
        return function(dispatch,getState) {
            dispatch(actions.showTip(message));
            setTimeout(() => {
                dispatch(actions.hideTip());
            },1500);
        }

    },

    changePhone: event => ({
        type: 'login/CHANGE_PHONE',
        payload: event.target.value
    }),

    changePwd : event => ({
        type : 'login/CHANGE_PWD',
        payload : event.target.value
    }),

    startLogin : () => ({
        type : 'login/START_LOGINING'
    }),

    successLogin : () => ({
        type : 'login/SUCCESS'
    }),

    failLogin : () => ({
        type : 'login/FAIL'
    }),

    hideTip : () => ({
        type : 'login/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'login/SHOWTIP',
        payload : message
    }),

}

export default actions;