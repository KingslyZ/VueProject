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
                    <!-- countChange事件的调用 -->
                    购买数量：<number :quality='info.stock_quantity' @countChange='getCount'></number>
                    <!-- 小球对应的动画 -->
                    <transition
                        v-on:before-enter="beforeEnter"
                        v-on:enter="enter"
                        v-on:after-enter="afterEnter"
                        v-on:after-leave="afterLeave"
                    >
                    <span v-show='isShow' class="ball">{{ count }}</span>
                    </transition>
                </div>
                <div class="buy">
                    <button class="mui-btn mui-btn-primary">立即购买</button>
                    <button @click='addCar' class="mui-btn mui-btn-danger">加入购物车</button>
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
            <a  @click= 'toComment' class="mui-btn mui-btn-danger mui-btn-outlined" >商品评论</a>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    //导入Vue实例
    import vueObj from '../../Config/communication.js';
    //导入轮播组件
    import myswipe from '../../Public/swipe.vue';
    //导入数据
    import number from '../../Public/number.vue';
    //导入本地存储
    import { setData } from '../../Public/localStorageHelp.js';
    export default{
        props:['id'],
        data(){
            return{
                info:{},
                picInfo:[],
                img_url:'getthumimages/'+this.id,
                count:1,
                isShow:false
            }
        },
        created(){
            this.getInfo() 
        },
        components:{
            myswipe,
            number
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
            },
           //编程式导航跳转到评论页面
           toComment(){
               this.$router.push({name:'goodsComment',params:{id:this.id}})
           },
            //自定义事件countChange对应的处理函数
            //count是从子组件接收过来数值
            getCount(obj){
                // console.log(count);
                //子组件给父组件传值
                this.count = obj.count;
                //不想关组件传值给app.vue传值
            },
            //加入购物车
            addCar(){
                // console.log(this.count);
               
                this.isShow = true; 
                setData({ id:this.id,count:this.count }); 
            },
            //动画执行之前
            beforeEnter(el){
                el.style.transform = 'translate(0,0)';
            },
            //动画进入
            enter(el,done){
                //记录距离
                let ballX = el.getBoundingClientRect().left;
                let ballY = el.getBoundingClientRect().top;
                //获取bange距离
                let badgeX = document.querySelector('.mui-badge').getBoundingClientRect().left;
                let badgeY = document.querySelector('.mui-badge').getBoundingClientRect().top;
                

                let X = badgeX - ballX;
                let Y = badgeY - ballY;
                //设置距离
                el.style.transform =`translate(${X}px,${Y}px)`
                done();
            },
            //动画进入完毕
            afterEnter(el){
                //小球消失
                this.isShow = false;
            },
            //动画执行完毕，显示badge才显示数据
            afterLeave: function () {
                vueObj.$emit('bringCount',this.count);
            }
        }
    }
</script>
<style scoped>
    .mui-content{
        padding-left: 10px;
        padding-right:10px;
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
        height:200px;
        border:1px solid #ccc;
        border-radius:3px;
        margin-top:5px;
        padding: 5px;
        font-size: 14px;
    }
    .detail h4{
        line-height: 24px;
        border-bottom: 1px solid #ccc;
        color:#0094ff;
        font-size: 16px;
    }
    .detail  .content{
        padding: 10px 20px;
        position: relative;
    }
    .detail  .content .ball{
        /* 提高小球层级 */
        z-index:100;
        display: inline-block;
        height: 25px;
        width: 25px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        top:46px;
        right:120px;
        text-align: center;
        line-height: 25px;
        color:#fff;
        transition: all 0.4s linear;
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

