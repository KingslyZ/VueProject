<template>
    <div ref = 'muicontent' class="detail">
        <mt-loadmore  :autoFill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <ul>
            <li v-for="(item,index) in info" :key="index">
                <router-link v-bind="{to:'/goodsInfo/'+item.id}">
                    <img :src="item.img_url">
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
        </mt-loadmore>
    </div>
</template>
<script>
    import Vue from 'vue';
    export default{
        data(){
            return {
                info:[],
                allLoaded:false,
                pageIndex:1
            }
        },
        created(){
            this.getInfo()
        },
        mounted(){//此时数据已经渲染完毕
            //解决难滑动的问题，因为距离70才能加载
            //而我们的大盒子，和列表的距离差不多，需要实现，
            //大盒子和容器一样大，列表大一些，这样列表滑动到容器底部时，
            //已经是最后一条数据，就可以再过70px就能获取下一页数据
            this.$refs.muicontent.style.height = document.documentElement.clientHeight +'px';
        },
        methods:{
            //获取信息
            getInfo:function(){
                var url = "getgoods?pageindex="+this.pageIndex;
                this.axios
                    .get(url)
                    .then((res)=>{
                        if(res.status ==200 && res.data.status ==0){
                            if(res.data.message.length == 0){
                                this.allLoaded = true;
                            }
                            // console.log(res.data.message);
                            this.info = this.info.concat(res.data.message);
                            //数据是异步获取，如果写在loadBottom()内，不显示“加载中”的文字
                            this.$refs.loadmore.onBottomLoaded();
                        }else{
                            console.log('服务器错误');
                        }
                       
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
            },
            //上滑加载更多
            loadBottom(){
                this.pageIndex ++;
                this.getInfo();
            }
        }
    }
</script>
<style scoped>
    /* mt-loadmore{
       
    } */
    .detail{
        padding-top: 44px;
        padding-bottom: 100px;
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
