<template>
    <div class="mui-content">
        <ul>
            <li v-for='(item,index) in info' :key = 'index'>
                <mt-switch v-model="values[index]" class="mui-pull-left"></mt-switch>
                <img class="mui-pull-left" :src="item.thumb_path" alt="">
                <div class="content">
                    <div class="title">{{ item.title }}</div>
                    <span class="sellPrice mui-pull-left">￥{{ item.sell_price }}</span>
                    <div class="count mui-pull-left">
                        <number :num='item.count' :id='item.id' @countChange='countChange'></number>
                    </div>
                    <div class="del mui-pull-left" @click = 'delData(item.id)'>删除</div>
                </div>
            </li>
        </ul>
        <div class="num">
            <div class="left  mui-pull-left">
                <p class="total">总计（不含运费）</p>
                <p >已经选择商品{{ count }}件，共计￥{{ totalPrice }}元</p>
            </div>
            <button class="mui-btn mui-btn-danger mui-pull-right">去结算</button>
        </div>
        {{ values }}
    </div>
    
</template>
<script>
    import number from '../Public/number.vue';
    //导入本地存储
    import { getData,delData,updateData } from '../Public/localStorageHelp.js';
    // 导入通信模块
    import vueObj from '../../components/Config/communication.js';

    export default{
        data(){
            return {
                info:[],
                values:[],
                ids:[],
                data:[],
                count:0,
                totalPrice:0
            }
        },
        components:{
            number
        },
        created(){
            this.getNum(),
            this.getInfo()
        },
        methods:{
            //获取本地数据
            getNum(){
                let data = getData();
                //如果没有数据，就不在发送请求
                if(data.length <= 0){
                    this.$toast('暂无数据');
                    return; 
                }
                data.forEach((item)=> {
                    this.ids.push(item.id);
                    // console.log(this.ids);
                });
                //排序data
                data.sort(function(item1,item2){
                    return item1.id  - item2.id
                })
                console.log(data);
                this.data = data;
            },
            //获取信息
            getInfo(){
                let url =  'goods/getshopcarlist/'+this.ids.join(',');
                this.axios
                    .get(url)
                    .then((res)=>{
                        console.log(res.data);
                        if(res.status === 200 && res.data.status ===0){
                            this.info = res.data.message;
                            // console.log(this.info);
                        }else{
                            this.$toast('服务器请求失败');
                        }
                        //排序this.info 
                        this.info.sort(function(item1,item2){
                            return item1.id - item2.id;
                        })
                        //插入数据count
                        this.info.forEach((item,index)=>{
                            item.count = this.data[index].count
                            this.values.push(false);
                        })
                        console.log(this.info);
                    })
                    .catch((err)=>{
                        console.error(err)
                    })
            },
            //删除数据
            delData(id){
                // 1 删除localStorage中的数据
                delData(id);
                // 2 页面删除数据
                //this.info进行数据的删除
                let index  = this.info.findIndex((item)=>{
                    return item.id = id
                });
                //删除数据
                this.info.splice(index,1);
                // 3 badge对应的值也要修改
                //思路：自定义事件，在app.vue处使用
                vueObj.$emit('delData')
            },
            //点击加减号的时候更新数据
            // 数据改变时 注册countChange事件
            countChange(obj){
                // console.log('countChange');
                // console.log(obj);
                // let num = obj.type === 'add' ? 1 : -1;
                // console.log(num);
                //调用本地存储
                // updateData({id:obj.id,type:num});
                //自定义事件通知 app.vue来改变数据  改变badge的值
                vueObj.$emit('uData')
            }


        },
        watch:{
            'values':function(newVlue){
                let count = 0;
                let totalPrice = 0;
                // 获取值是true的按钮对应的数量 count 
                this.values.forEach((item,index)=>{
                    if(item){
                        count += this.info[index].count;
                        // console.log(count);
                        this.count = count;
                        //计算总价
                        totalPrice += this.info[index].count * this.info[index].sell_price;
                        // console.log(totalPrice);
                        this.totalPrice = totalPrice;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .mui-content {
        background-color: #fff;
        position: relative;
    }
    .mui-content ul{
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .mui-content img{
        height: 75px;
        width: 75px;
    }
    mt-switch{
       
    }
    .mui-content li{
       padding:10px;
       height: 100px;
       border-bottom: 1px solid #ccc;
    }
    .content{
        margin-left:5px;
    }
    .content .title{
        color:#0099f4;
        font-size: 14px;
    }
    .content .sellPrice{
        color:red;
        font-size: 20px;
       
    }
    .count{
        margin:0 10px;
    }
    .count .left{
        height:25px;
        width:30px;
        border:1px solid #ccc;
        text-align: center;
    }
    .count .right{
        height:25px;
        width:30px;
        border:1px solid #ccc;
        text-align: center;
    }
    .count .middle{
        height:25px;
        width:30px;
        border:1px solid #ccc;
        text-align: center;
    }
    .del{
        color:#ccc;
        font-size: 14px;
        margin-top:12px;
    }
    .num{
        color:#000;
        height: 70px;
        background-color: #ccc;
        padding: 10px;
    }
    .num .total{
        font-size: 18px;
        color:#000;
    }
    .num button{
        margin-top: 10px;
    }
</style>

