<template>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item,index) in imgList" :key="index">
            <a :href="item.url">
                <img  :src="item.img" alt="轮播图">
            </a>
        </mt-swipe-item>
    </mt-swipe>
</template>
<script>
export default {

    props:['imgUrl'],
    data(){
        return{
            imgList:[]
        }
    },
    created(){
        this.getlunbo()
    },
    methods:{
        getlunbo:function(){
          //使用axios获取
          this.axios
            .get(this.imgUrl)
            .then((res)=>{ 
                console.log(res.data.message);
                if(res.status == 200 && res.data.status === 0){
                    this.imgList = res.data.message;
                }else{
                    console.log('请求服务器失败');
                }
            })
            .catch((err)=>{
                console.error(err);
            })
      }
    }
}
</script>
<style scoped>
.mint-swipe{
    height: 250px;
}
.mint-swipe img{
    width: 100%;
    height: 100%;
}
   
</style>


