import AV from 'leancloud-storage';


const Product = AV.Object.extend('Product');


let showStatus = false;

let pushStatus = false;

let actions = {

    onPushClick : function(history,location) {

        return function(dispatch, getState) {

            let data = getState().push;
            let currentUser = AV.User.current();
            let product;
            let phoneExp = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
            let reg=/^[a-zA-Z\d_]{5,}$/;
            let id;
            let search = location.search;

                if(search && search != "") {
                    id = search.substring(4);
                }
                if(pushStatus) {
                    return;
                }else{
                    pushStatus = true;
                }
                if(id) {
                    product = AV.Object.createWithoutData('Product', id);
                }else{
                    product = new Product();
                }

                if(showStatus) {
                    product.set('show', data.show);
                }else{
                    if(!id) {
                        pushStatus = false;
                        dispatch(actions.showMessage("请上传猫咪证件照"));
                        return;
                    }
                }
            
                product.set('owner', currentUser);
                product.set('name', data.name);
                product.set('weixin', data.weixin);
                product.set('phone', data.phone);
                product.set('address', data.address);
                product.set('type', data.type);
                product.set('price', data.price);
                product.set('sex', data.sex);
                product.set('age', data.age);
                product.set('sendType', data.sendType);
                product.set('yimiao', data.yimiao);
                product.set('quchong', data.quchong);
                product.set('sterilisation', data.sterilisation);

                //验证数据
                if(!data.name || data.name == "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入联系人"));
                    return;
                }

                if(!data.weixin || data.weixin == "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入微信号或填保密"));
                    return;
                }

                if(!data.phone || data.phone == "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入手机号或填保密"));
                    return;
                }

                if((!phoneExp.test(data.phone)) && (!reg.test(data.weixin))) {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入正确的手机号或正确的微信号"));
                    return;
                }

                if(!data.address || data.address == "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入猫咪所在地址"));
                    return;
                }

                if(!data.type || data.type == "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入猫咪品种"));
                    return;
                }

                if(data.price === "") {
                    pushStatus = false;
                    dispatch(actions.showMessage("请输入价格，免费填0"));
                    return;
                }
                

                product.save().then(function() {
                    dispatch(actions.successPush());
                    setTimeout(() => {
                        dispatch(actions.hideTip());  
                        history.push("./index");
                    },1500);
                }, function(error) {
                    pushStatus = false;
                    alert(JSON.stringify(error));
                    dispatch(actions.failPush());
                });
            
        }
            
     },

    onChangeFile : function(event) {

        return function(dispatch, getState) {

            let file = event.target.files[0];
            let name = file.name;
            let avFile = new AV.File(name, file);
            let reader = new FileReader();
                showStatus = true;
                reader.readAsDataURL(file);
                reader.onload = function(event) {

                    dispatch(actions.changeFileUrl(event.target.result,avFile,name));
                    
                };    

        }

    },

    getDetail : function(id) {
        
        return function(dispatch,getState) {

            let query = new AV.Query('Product');
                if(id) {
                    query.include('owner');
                    query.get(id).then(function (product) {
                        let info = {};
                        let name = product.get('name');
                            let releaseTime = product.createdAt.getFullYear() + '/'  + (product.createdAt.getMonth() + 1) + '/' + product.createdAt.getDate();
                            let userName = product.get('owner').get('username');
                            let weixin = product.get('weixin');
                            let phone = product.get('phone');
                            let address = product.get('address');
                            let type = product.get('type');
                            let price = product.get('price');
                            let sex = product.get('sex');
                            let age = product.get('age');
                            let sendType = product.get('sendType');
                            let yimiao = product.get('yimiao');
                            let quchong = product.get('quchong');
                            let objectId = product.get('objectId');
                            let show = product.get('show');
                                if(show) {
                                    show = show.get('url');
                                }else{
                                    show = "http://fe.c360dn.com/operation-activity/eight/no-pic.png";
                                }
                            
                                info = {
                                    name,
                                    show,
                                    releaseTime,
                                    userName,
                                    weixin,
                                    phone,
                                    address,
                                    type,
                                    price,
                                    sex,
                                    age,
                                    sendType,
                                    yimiao,
                                    quchong,
                                    objectId
                                };
                                dispatch(actions.setData(info));
                        
                    }, function (error) {
                        dispatch(actions.showMessage("获取失败"));
                    });
                }
            
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

    onChangeData : event => ({
        type: 'push/CHANGE_DATA',
        payload: {
            value : event.target.value,
            name : event.target.name
        }
    }),

    startPush : () => ({
        type : 'push/PUSH_LOGINING'
    }),

    successPush : () => ({
        type : 'push/SUCCESS'
    }),

    failPush : () => ({
        type : 'push/FAIL'
    }),

    hideTip : () => ({
        type : 'push/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'push/SHOWTIP',
        payload : message
    }),

    changeFileUrl : (url,file,name) => ({
        type : 'push/CHANGE_FILE',
        payload : {
            image : url,
            show : file,
            showName : name
        }
    }),

    setData : (data) => ({
        type : 'push/SETDATA',
        payload : data
    })

}

export default actions;