<template>
    <div class="mui-content">
        <ul>
            <li v-for='(item,index) in info' :key = 'index'>
                <mt-switch v-model="values[0]" class="mui-pull-left"></mt-switch>
                <img class="mui-pull-left" :src="item.thumb_path" alt="">
                <div class="content">
                    <div class="title">{{ item.title }}</div>
                    <span class="sellPrice mui-pull-left">￥{{ item.sell_price }}</span>
                    <div class="count mui-pull-left">
                        <number :num='item.count'></number>
                    </div>
                    <div class="del mui-pull-left">删除</div>
                </div>
            </li>
        </ul>
        <div class="num">
            <div class="left  mui-pull-left">
                <p class="total">总计（不含运费）</p>
                <p >已经选择商品0件，共计￥0元</p>
            </div>
            <button class="mui-btn mui-btn-danger mui-pull-right">去结算</button>
        </div>
    </div>
</template>
<script>
    import number from '../Public/number.vue';
    //导入本地存储
    import { getData } from '../Public/localStorageHelp.js';
    export default{
        data(){
            return {
                info:[],
                values:[true,false],
                ids:[],
                data:[]
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
                        })
                        console.log(this.info);
                    })
                    .catch((err)=>{
                        console.error(err)
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

