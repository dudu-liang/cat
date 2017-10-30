import server from '../config/server';
import AV from 'leancloud-storage';

let actions = {

    onRegisterClick : function(history) {

        return function(dispatch, getState) {

            let data = getState().register;
            let isLoging = data.isLoging;
            let email = data.email;
            let pwd = data.password;
            let repwd = data.repassword;
            let emailRxp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;

                if(!email || email == "") {
                    dispatch(actions.showMessage("请输入邮箱"));
                    return;
                }

                if(!emailRxp.test(email)) {
                    dispatch(actions.showMessage("邮箱格式不正确"));
                    return;
                }

                if(!pwd || pwd == "") {
                    dispatch(actions.showMessage("请输入密码"));
                    return;
                }

                if(pwd.length < 6 || pwd.length > 20) {
                    dispatch(actions.showMessage("密码不能小于6位或大于20位"));
                    return;
                }

                if(!repwd || repwd == "") {
                    dispatch(actions.showMessage("请输入确认密码"));
                    return;
                }

                if(pwd != repwd) {
                    dispatch(actions.showMessage("两次输入的密码不一致"));
                    return;
                }

                if(isLoging) { //正在注册
                    return;
                }

                dispatch(actions.startLogin());

                let user = new AV.User();
                    user.setUsername(email);
                    user.setPassword(pwd);
                    user.setEmail(email);
                    user.signUp().then(function (loginedUser) {
                        dispatch(actions.successRegister());
                        setTimeout(() => {
                            dispatch(actions.hideTip());  
                            history.push("./index");
                        },1500);
                    }, (function (error) {
                        dispatch(actions.showMessage("注册失败或邮箱已存在"));
                    }));
                   
                
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

    changeEmail: event => ({
        type: 'register/CHANGE_EMAIL',
        payload: event.target.value
    }),

    changePwd : event => ({
        type : 'register/CHANGE_PWD',
        payload : event.target.value
    }),

    changeRePwd : event => ({
        type : 'register/CHANGE_REPWD',
        payload : event.target.value
    }),

    startLogin : () => ({
        type : 'register/START_LOGINING'
    }),

    successRegister : () => ({
        type : 'register/SUCCESS'
    }),

    hideTip : () => ({
        type : 'register/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'register/SHOWTIP',
        payload : message
    })

}

export default actions;