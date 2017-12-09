<template>
    <div class="mui-content">
        <myswipe :imgUrl='img_url'></myswipe>
        <!-- 详情 -->
        <div class="detail">
            <div class="title">
                <h4>{{info.title}}</h4>
            </div>
            <div class="content">
                <div class="price">
                    <span class="marketPrice">市场价：￥{{info.market_price}}</span>
                    <span class="sellPrice">销售价：￥{{info.sell_price}}</span>
                </div>
                <div class="count">
                    购买数量：
                </div>
                <div class="buy">
                    <button class="mui-btn mui-btn-primary">立即购买</button>
                    <button class="mui-btn mui-btn-danger">加入购物车</button>
                </div>
            </div>
        </div>
        <!-- 参数列表 -->
        <div class="List">
            <div class="title">
                <h6>商品参数</h6>
            </div>
            <div class="content">
                <ul>
                    <li>商品编号：{{info.goods_no}}</li>
                    <li>库存情况：{{info.stock_quantity}}</li>
                    <li>上架时间：{{info.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</li>
                </ul>
            </div>
        </div>
        <!-- 图文介绍 -->
        <div class="interview">
            <router-link class="mui-btn mui-btn-primary mui-btn-outlined" v-bind="{to:'/goodsDec/'+info.id}">图文介绍</router-link>
            <router-link class="mui-btn mui-btn-danger mui-btn-outlined" v-bind="{to:'/goodsComment/'+info.id}">商品评论</router-link>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    //导入轮播组件
    import myswipe from '../../Public/swipe.vue';
    export default{
        props:['id'],
        data(){
            return{
                info:{},
                picInfo:[],
                img_url:'goods/getthumimages/'+this.id
            }
        },
        created(){
            this.getInfo() 
        },
        components:{
            myswipe
        },
        methods:{
            //获取详情
            getInfo(){  
                var url ='goods/getinfo/'+this.id;
                this.axios
                    .get(url)
                    .then((res)=>{
                        console.log(res.data.message);
                        this.info = res.data.message[0];
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
            }
            
        }
    }
</script>
<style scoped>
    .mui-content{
        padding: 10px;
        background-color: #fff;
    }
    my-swipe{
        height: 250px;
        border:1px solid #ccc;
        border-radius:3px;
        margin-top:44px;
    }
    /* 详情部分 */
    .detail{
        height:176px;
        border:1px solid #ccc;
        border-radius:3px;
        margin-top:5px;
        padding: 5px;
        font-size: 14px;
    }
    .detail h4{
        height: 34px;
        line-height: 34px;
        border-bottom: 1px solid #ccc;
        color:#0094ff;
        font-size: 16px;
    }
    .detail  .content{
        padding: 10px 20px;
    }
    .detail .price{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        margin-bottom: 5px;
    }
    .detail .price .marketPrice{
        text-decoration: line-through;
    }
    .detail .price .sellPrice{
        color:red;
        font-size: 16px;
    }


    /* 参数列表 */
    .List{
        height:130px;
        border:1px solid #ccc;
        border-radius: 3px;
        margin-top: 5px;
        padding: 5px;
    }

    .List h6{
        height:25px;
        line-height: 25px;
        font-size: 14px;
        border-bottom:1px solid #ccc;
    }
    .List .content{

    }
    .List .content ul{
        padding: 0;
        margin: 0;
        list-style: none;  
        color:#8f8f94;
        font-size: 14px; 
        padding-left: 20px; 
        padding-top: 10px;
    }
    /* 图文介绍 */
    .interview{
        height:98px;
        border:1px solid #ccc;
        border-radius: 3px;
        margin-top: 10px;
        padding: 10px;
        margin-bottom: 44px;
    }
    .interview a{
        width: 100%;
        margin-bottom: 10px;
    }
</style>

