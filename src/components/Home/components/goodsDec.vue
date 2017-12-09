<template>
    <div class="mui-content">
       <div class="title">
           {{ details.title }}
       </div>
       <!-- 轮播图 -->
        <div class="pic">
            <ul>
                <li>
                    <a href="#">
                        <img src="" height:100px>
                    </a>
                </li>
            </ul>
        </div>
       <!-- 商品描述 -->
       <div class="detail" v-html='details.content'>
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
    .title{
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #ccc;
    }
   .pic{
        height: 250px;
        border:1px solid #ccc;
        border-radius:3px;
        margin-top:5px;
    }
    .pic ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .detail{
        padding: 5px;
        overflow: hidden;
    }
</style>
