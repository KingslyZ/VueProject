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


//实例化路由对象
let router = new VueRouter({
    linkExactActiveClass:'mui-active',
    routes:[
        {path:'/',redirect:'/home'},
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/search",component:search},
        {path:'/shopcar',component:shopcar},
        {path:"/news",component:news},
        {path:'/newsDetails/:id',component:newsDetails,props:true},
        {path:'/share',component:share},
        {path:"/shareInfo/:id",component:shareInfo,props:true},
        {path:'/buy',component:buy},
        {path:'/goodsInfo/:id',component:goodsInfo,props:true},
        {path:'/feedback',component:feedback},
        {path:'/video',component:video},
        {path:'/contact',component:contact},
    ]
})



//暴露出去router
export default router;