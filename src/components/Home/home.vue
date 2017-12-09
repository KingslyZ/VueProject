<template>
    <div class="mui-content ">
       <my-swipe :imgUrl='img_url'></my-swipe>
        <!-- 九宫格区域 -->
         <ul class="mui-table-view mui-grid-view mui-grid-9 my-pic">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/news">
                    <img src="static/images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/share">
                    <img src="static/images/menu2.png" alt="">
                    <div class="mui-media-body">图片分享</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/buy">
                    <img src="static/images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/feedback">
                    <img src="static/images/menu4.png" alt="">
                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/video">
                    <img src="static/images/menu5.png" alt="">
                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <a href="#/contact">
                    <img src="static/images/menu6.png" alt="">
                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>     
        </ul>
    </div>      
  
</template>
<script>

//导入轮播图
import mySwipe from '../../components/Public/swipe.vue';

export default {
    created:function(){
        // this.getmenu()
    },
  data() {
    return {
      img_url:'getlunbo'
    };
  },
  components:{
      mySwipe
  },
  methods:{
      //获取九宫格
    //   getmenu:function(){
    //       this.axios
    //         .get('getmenus')
    //         .then((res)=>{
    //             if(res.status === 200 && res.data.status ===0){
    //                 console.log(res.data.message);
    //             }else{
    //                 console.log('请求服务器失败');
    //             }
    //         })
    //         .catch((err)=>{
    //             console.error(err)
    //         })
    //   }
  }
}

</script>
<style scoped>
    .my-pic img{
        width:50px;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }
</style>

