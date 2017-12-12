<template>
<div>
    <header class="mui-bar mui-bar-nav">
        <a v-if = 'isShow' @click='goBack' class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">VueCMS</h1>
    </header>
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
            <span class="mui-icon mui-icon-email"></span>
            <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
            <span class="mui-icon mui-icon-contact">
            <span class="mui-badge">{{count}}</span></span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="/search">
            <span class="mui-icon mui-icon-gear"></span>
            <span class="mui-tab-label">搜索</span>
        </router-link>
    </nav>
    <router-view></router-view>
</div>

</template>
<script>
    import vueObj from '../src/components/Config/communication.js';
    //导入本地存储
    import { getData } from './components/Public/localStorageHelp.js';
    export default {
       data(){
           return {
               isShow:false,
               count:0
           }
       },
       created(){
          this.judgePath(this.$route.path);
          vueObj.$on('bringCount',(count)=>{
                // console.log(count);
                this.count += count;
            });
            //获取本地存储的数据
            this.getNum();
       },
       methods:{
           goBack(){
               this.$router.back()
           },
           judgePath(path){
               let arr = ['/home','/member','/shopcar','/search'];
               if(arr.indexOf(path) ==-1){
                   this.isShow = true;
               }else{
                   this.isShow = false;
               }
           },
           getNum(){
               let data = getData();
               let num = 0;
               data.forEach(function(item) {
                   num += item.count;
               });
                this.count = num;
           }
          
       },
       watch:{
           '$route':function(newValue){
               this.judgePath(newValue.path);
           }
       }
    }
</script>
<style scoped>
   
</style>
