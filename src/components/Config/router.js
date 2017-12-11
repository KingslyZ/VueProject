//导入vue-router模块
import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);
//导入组件文件
import home from '../Home/home.vue';
import member from '../Member/member.vue';
import search from '../Search/search.vue';
import shopcar from '../Shopcar/shopcar.vue';
//导入home页面的组件
import news from "../Home/components/news.vue";
import share from "../Home/components/share.vue";
//导入新闻详情页面
import newsDetails from "../Home/components/newsDetails.vue";
//导入图片详情页面
import shareInfo from "../Home/components/shareDetails.vue";
//导入购买商品
import buy from "../Home/components/buy.vue";
//导入商品详情页面
import goodsInfo from "../Home/components/goodsInfo.vue";
//导入留言反馈模块
import feedback from "../Home/components/feedback.vue";
//导入视频专区模块
import video from "../Home/components/video.vue";
//导入联系我们
import contact from "../Home/components/contact.vue";
//导入购买商品时的商品详情
import goodsDec from '../Home/components/goodsDec.vue';
//导入购买商品时的评论页面
import goodsComment from '../Home/components/goodsComment.vue';


//实例化路由对象
let router = new VueRouter({
    linkExactActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:"/home",meta:{title:'首页'},component:home},
        {path:"/member",meta:{title:'会员中心'},component:member},
        {path:"/search",meta:{title:'搜索'},component:search},
        {path:'/shopcar',meta:{title:'购物车'},component:shopcar},
        {path:"/news",meta:{title:'新闻列表'},component:news},
        {path:'/newsDetails/:id',meta:{title:'新闻详情'},component:newsDetails,props:true},
        {path:'/share',meta:{title:'图片分享'},component:share},
        {path:"/shareInfo/:id",meta:{title:'图片详情'},component:shareInfo,props:true},
        {path:'/buy',meta:{title:'商品购买'},component:buy},
        {path:'/goodsInfo/:id',meta:{title:'商品详情'},component:goodsInfo,props:true},
        {path:'/feedback',component:feedback},
        {path:'/video',component:video},
        {path:'/contact',component:contact},
        {path:'/goodsDec/:id',component:goodsDec,props:true},
        {name:'goodsComment',path:'/goodsComment/:id',component:goodsComment,props:true}
    ]
   
});
router.afterEach((to, from) => {
    console.log(to.meta);
    if(to.meta.title){
        document.title = to.meta.title
    }else{
        document.title = '首页';
    }
    
})



//暴露出去router
export default router;