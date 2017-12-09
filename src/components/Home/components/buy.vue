<template>
    <div class="detail">
        <ul>
            <li v-for="(item,index) in info" :key="index">
                <router-link v-bind="{to:'/goodsInfo/'+item.id}">
                    <img :src="item.img_url" alt="">
                    <p class="title">{{item.title}}</p>
                    <p>
                        <span class="nowPrice">￥{{item.sell_price}}</span>
                        <span class="oldPrice">￥{{item.market_price}}</span><br>
                        <span class="mui-pull-left">热卖中</span>
                        <span class="mui-pull-right">剩余{{item.stock_quantity}}件</span>
                    </p>
               </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default{
        data(){
            return {
                info:[]
            }
        },
        created(){
            this.getInfo()
        },
        methods:{
            getInfo:function(){
                var url = "http://vue.studyit.io/api/getgoods";
                this.$http.get(url).then((res)=>{
                    console.log(res.body.message);
                    this.info = res.body.message;
                },(err)=>{
                    console.log('暂无数据');
                })

            }
        }
    }
</script>
<style scoped>
    .detail{
        padding-top: 44px;
    }
     .detail ul{
         padding: 0;
         margin: 0;
         list-style: none;
         overflow: hidden;
    }
    .detail ul li{
        width: 50%;
        height:300px;
        float: left;
        border:1px solid #ccc;
        box-shadow:2px 2px 0 #ccc;
        
    }
    .detail ul li a{
        display: inline-block;
        padding: 4px;
    }
     .detail ul li img{
       width: 100%;
       vertical-align: middle;
    }
    .detail ul li .title{
        font-size: 12px;
        background-color: #fff;
    }
    .detail ul li .nowPrice{
        color:red;
    }
    .detail ul li .oldPrice{
       text-decoration: line-through;
       font-size: 10px;
    }
</style>
