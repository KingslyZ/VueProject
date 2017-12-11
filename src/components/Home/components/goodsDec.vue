<template>
    <div class="mui-content">
       <div class="title">
           {{ details.title }}
       </div>
       <!-- 商品描述 -->
       <div class="content" v-html='details.content'>
       </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                details:{}
            }
        },
        props:['id'],
        created(){
            this.getDetil()
        },
        methods:{
            //获取详情
            getDetil(){
                let url = 'goods/getdesc/'+this.id;
                this.axios
                    .get(url)
                    .then((res)=>{
                        // console.log(res.data);
                        if(res.status ===200 && res.data.status == 0){
                            this.details = res.data.message[0]
                        }else{
                            this.$toast('请求服务器失败')
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
    .mui-content{
        background-color: #fff;
        padding-left: 10px;
        padding-right: 10px;
        width: 100%;
    }
    
  
</style>
