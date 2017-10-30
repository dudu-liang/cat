import AV from 'leancloud-storage';

let actions = {

    getDetail : function(id) {
        
        return function(dispatch,getState) {

            let query = new AV.Query('Product');
            
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
                        let status = product.get('status');
                        let sterilisation = product.get('sterilisation');
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
                                objectId,
                                status,
                                sterilisation
                            };
                           
                            dispatch(actions.setData(info));
                                            
                }, function (error) {
                    alert("获取失败");
                });
            
        }

    },

    hideTip : () => ({
        type : 'detail/HIDETIP'
    }),

    setData : (data) => ({
        type : 'detail/SETDATA',
        payload : data
    })

}

export default actions;