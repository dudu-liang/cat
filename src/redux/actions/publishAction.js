import AV from 'leancloud-storage';

let actions = {

    getUser : function() {
       
        return function(dispatch,getState) {

            let owner = AV.User.current();
            let query = new AV.Query('Product');
            let list = [];
                query.equalTo('owner', owner);
                query.descending('createdAt');
                query.find().then(function (products) {
                    products.forEach(function(product) {
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
                                show
                            });
                    });
                    dispatch(actions.changeList(list));
                }, function (error) {
                    alert("获取失败");
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

    pageEdit : function(id,history,event) {

        event.stopPropagation();

        return function() {
            history.push("./push?id=" + id);
        }
    },

    pageDetail : function(id,history) {
       
        return function(dispatch,getState) {
            history.push("./detail?id=" + id);
        }
    },

    hideTip : () => ({
        type : 'publish/HIDETIP'
    }),

    showTip : (message) => ({
        type : 'publish/SHOWTIP',
        payload : message
    }),

    changeList : (data) => ({
        type : 'publish/CHANGE_LIST',
        payload : data
    })

}

export default actions;