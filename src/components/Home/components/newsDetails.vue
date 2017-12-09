<template>
  <div class="mui-content">
    <div class="title mui-clearfix">
        <h4>{{details.title}}</h4>
        <span class="mui-pull-left">发表时间：{{details.add_time | fmtdate('YYYY-MM-DD')}}</span>
        <span class="mui-pull-right">{{details.click}}次浏览</span> 
    </div>
    <hr>
    <div class="content" v-html="details.content">
    </div>
     <my-comment :id='id'></my-comment>
  </div>
</template>
<script>

    import Vue from 'vue';
    //导入评论模块
    import myComment from '../../Public/comments.vue';
    export default{
        props:['id'],
        created:function(){
            this.getDetails();
        },
        data(){
            return{
                details:{}
            }
        },
        components:{
            myComment
        },
        methods:{
            //获取新闻详情
            //使用axios获取
            getDetails:function(){
                var id = this.id;
                var url = 'getnew/'+id;
                this.axios
                    .get(url)
                    .then((res)=>{
                        // console.log(res.data.message);
                        if(res.status === 200){
                            this.details = res.data.message[0]; 
                        }else{
                            console.log('获取数据失败');
                        }   
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
           
        }     
    }
</script>
<style scoped>
    .mui-content{
        padding-left: 10px;
        padding-right: 10px;
    }
    .title h4{
        color:#0094ff;
        font-size: 16px;
    }
    .title span{
        font-size: 14px;
    }
     
</style>

