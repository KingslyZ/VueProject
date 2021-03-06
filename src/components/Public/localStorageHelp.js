//本地存储模块
//数据格式
    //{goodslist:[{id:1,count:2},{....}]}

//获取数据
export function getData(){
    //获取到的是字符串，而我们想要对象形式
    return JSON.parse( localStorage.getItem('goodslist') || '[]' );
}

//设置数据
export function setData(json){
    //先检测本地是否有数据，如果有就累加，没有就push
    let data = getData();
    //遍历数组
    let flag = false;
    data.forEach(function(item) {    
        if(item.id == json.id){
            //count就累加
            item.count += json.count;
            flag = true;
        }  
    });
     //但是不可以else
     if(!flag){
        data.push(json);
    }
    //设置数据
    localStorage.setItem('goodslist',JSON.stringify(data));
}

//删除数据
export function delData(id){
    //查找id
    var data = getData();
    //循环查找数据
    let index = data.findIndex((item)=>{
        return item.id = id;
    })
    data.splice(index,1);
    localStorage.setItem('goodslist',JSON.stringify(data));
}

//更新数据
export function updateData(json){
    
    //获取数据
    let data = getData();
    //查询id    
    data.forEach((item)=>{
        if(item.id == json.id){
            item.count += json.type;
        }
    })
    //再次存储回去
    localStorage.setItem('goodslist',JSON.stringify(data));
}