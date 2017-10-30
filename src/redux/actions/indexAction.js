import AV from 'leancloud-storage';

const Collect = AV.Object.extend('Collect');

let collect = new Collect();

let context = [];

let skip = 0;

let last = false;

let actions = {

    getList : function() {
        
        return function(dispatch,getState) {

            let query = new AV.Query('Product');
            let currentUser = AV.User.current();
            let all = getState().index;
            let sort = 0;

                dispatch(actions.showLoading());

                query.include('owner');
                query.notEqualTo('status', 2); //1：上架，2：下架
                query.descending('createdAt');
                query.limit(10);
                query.skip(skip);

                if(all.last) {
                    dispatch(actions.hideLoading());  
                    return;
                }

                query.find().then(function (products) {

                   if(products.length != 0) {
                       skip += 10;
                   }else{
                        dispatch(actions.changeLast());  
                   }
                   dispatch(actions.hideLoading());  
                   products.forEach(function(product,index) {
                    
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
                        let isCollected = product.get('isCollected');
                        let show = product.get('show');
                        
                            if(show) {
                                show = show.get('url');
                            }else{
                                show = "http://fe.c360dn.com/operation-activity/eight/no-pic.png";
                            }

                            let colquery = new AV.Query('Collect');  
                                colquery.equalTo('owner',currentUser);
                                colquery.equalTo('productId',objectId);
                                colquery.find().then(function (datas) {
                                    sort ++;
                                    if(datas.length == 0) {
                                        isCollected = 0;
                                    }else{
                                        isCollected = 1;
                                    }

                                    context.push({
                                            name,
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
                                            objectId,
                                            show,
                                            isCollected
                                        });

                                        if(sort == products.length) {
                                            dispatch(actions.changeList(context));
                                        }
                                });

                           
                    });
                    
                }).catch(function(error) {
                    dispatch(actions.hideLoading());
                    console.log(JSON.stringify(error));
                });
        }

    },

    changeCollect : function(id,isCollected,history,event) {

        event.stopPropagation();

        event = event.persist() || event;

        return function(dispatch,getState) {

            let currentUser = AV.User.current();
            let product = AV.Object.createWithoutData('Product', id);
            let query = new AV.Query('Collect');

                if(!currentUser) {
                    dispatch(actions.showMessage("还未登录哦"));
                    setTimeout(() => {
                        history.push("./login");
                    },1600);
                }else{
                    query.equalTo('owner',currentUser);
                    query.equalTo('productId',id);
                    query.find().then(function (datas) {
                        if(datas.length == 0) {
                            collect.set('owner', currentUser);
                            collect.set('productId', id);
                            collect.set('Product', product);
                            collect.save().then(function(res) {
                                let message = "收藏成功";
                                    dispatch(actions.showTip(message));
                                    event.target.src = "http://fe.c360dn.com/operation-activity/eight/col.png";
                                    setTimeout(() => {
                                        dispatch(actions.hideTip());  
                                    },1500);
                            })
                        }else{
                            
                            datas.forEach(function(data) {
                                let id = data.get("objectId");
                                let collection = AV.Object.createWithoutData('Collect', id);
                                    collection.destroy().then(function (success) {
                                        let message = "取消收藏成功";
                                            dispatch(actions.showTip(message));
                                            setTimeout(() => {
                                                dispatch(actions.hideTip());  
                                                event.target.src = "http://fe.c360dn.com/operation-activity/eight/no-col.png";
                                            },1500);
                                    }, function (error) {
                                        let message = "取消收藏失败";
                                            dispatch(actions.showTip(message));
                                            setTimeout(() => {
                                                dispatch(actions.hideTip());  
                                            },1500);
                                    });
                            });
                        }
                    }).catch(function(error) {
                    });

                }
        }

    },

    pagePush : function(history) {

        return function(dispatch,getState) {

            let username = AV.User.current();
                if(!username) {
                    dispatch(actions.showMessage("还未登录哦"));
                    setTimeout(() => {
                        history.push("./login");
                    },1600);
                }else{
                    history.push("./push");
                }
            
        }

    },

    pageDetail : function(id,history) {
       
        return function(dispatch,getState) {
            history.push("./detail?id=" + id);
        }
    },

    onChangePush : function(history) {
        return function() {
             history.push('./push');
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

    changeLast : () => ({
       type : 'index/CHANGE_LAST'
    }),

    hideTip : () => ({
        type : 'index/HIDETIP'
    }),

    changeList : (list) => ({
        type : 'index/CHANGE_LIST',
        payload : list
    }),

    showTip : (message) => ({
        type : 'index/SHOWTIP',
        payload : message
    }),

    showLoading : () => ({
        type : 'index/LOADINGSHOW'
    }),

    hideLoading : () => ({
        type : 'index/LOADINGHIDE'
    }),

}

export default actions;