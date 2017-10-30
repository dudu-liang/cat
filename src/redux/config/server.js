

let server = {
   
    getJSON : function(url,params,callback) {

        if (params) {  
            let paramsArray = [];  
            //拼接参数  
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
            if (url.search(/\?/) === -1) {  
                url += '?' + paramsArray.join('&')  
            } else {  
                url += '&' + paramsArray.join('&')  
            }  
        }  
        
        fetch(url,{
            method : "GET"
        })
        .then((response) => response.json())  
        .then((json) => {  
            if(callback) callback(json);
        })  
        .catch((error) => {  
            alert(error); 
        });

    },

    getPOST : function(url,params,callback) {

        fetch(url,{
            method : "POST",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body : JSON.stringify(params)
        })
        .then((res) => {
            if(callback) callback();
        });

    }
}

export default server;