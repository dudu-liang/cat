import AV from 'leancloud-storage';

let actions = {

    getUser : function() {
       
        return function(dispatch,getState) {

            let owner = AV.User.current();
            let query = new AV.Query('Collect');
            let list = [];
                query.equalTo('owner', owner);
                query.include('Product');
                query.descending('createdAt');
                query.find().then(function (products) {

                    if(products.length == 0) {
                        dispatch(actions.changeList(list));
                    }
                    
                    products.forEach(function(prod,index) {
                        let product = prod.get('Product');
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
                        let status = product.get('status');
                        let sendType = product.get('sendType');
                        let yimiao = product.get('yimiao');
                        let quchong = product.get('quchong');
                        let objectId = product.get('objectId');
                        let isCollected = 1;
                        let show = product.get('show');
                        
                            if(show) {
                                show = show.get('url');
                            }else{
                                show = "http://fe.c360dn.com/operation-activity/eight/no-pic.png";
                            }
                            list.push({
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
                                status,
                                show,
                                isCollected
                            });
                            if(index == products.length -1) {
                                dispatch(actions.changeList(list));
                            }
                    });
                    
                }, function (error) {
                    alert("获取失败");
                });
                
        }
    },

    changeCollect : function(id,isCollected,event) {

        event.stopPropagation();

        event = event.persist() || event;

        return function(dispatch,getState) {

            let currentUser = AV.User.current();
            let product = AV.Object.createWithoutData('Product', id);
            let query = new AV.Query('Collect');
            const Collect = AV.Object.extend('Collect');
            let collect = new Collect();
                
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
                                setTimeout(() => {
                                    dispatch(actions.hideTip());  
                                    event.target.src = "http://fe.c360dn.com/operation-activity/eight/col.png";
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
                                            window.location.reload();
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
                    console.log("收藏或取消收藏失败");
                });

        }

    },

    changeStatus : function(id,status,event) {

        event.stopPropagation();

       return function(dispatch,getState) {

        let product = AV.Object.createWithoutData('Product', id);
        let last = status == 1 ? 2 : 1;
            product.set('status', last);
            product.save().then(function() {
                dispatch(actions.showTip("状态修改成功"));
                setTimeout(() => {
                    dispatch(actions.hideTip());  
                    window.location.reload();
                },1500);
                
            });
            
       }

    },

    pageDetail : function(id,history) {
       
        return function(dispatch,getState) {
            history.push("./detail?id=" + id);
        }
    },

    hideTip : () => ({
        type : 'collect/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'collect/SHOWTIP',
        payload : message
    }),

    changeList : (data) => ({
        type : 'collect/CHANGE_LIST',
        payload : data
    })

}

export default actions;