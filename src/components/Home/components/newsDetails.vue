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
      <!--  评论 -->
    <div class="comment">
        <!--添加评论-->
        <h4>提交评论</h4>

        <div class="submitcomment">
            <textarea placeholder="请输入评论内容" v-model="value"></textarea>
            <button class="mui-btn mui-btn-primary" @click='this.submitComment'>发表</button>
        </div>
            
        <div class="title">
            <h4>评论列表</h4>
        </div>    
        
        <!--评论列表-->
        
        <div class="item" v-for="(item,index) in comments" :key="index">
            <div class="content">{{item.content}}</div>
            <div>
                <span class="user">{{item.user_name}}</span>  
                <span>{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</span>
            </div>
        </div>

        <div class="more">
            <button class="mui-btn mui-btn-primary mui-btn-outlined" @click= 'this.getMore'>加载更多</button>
        </div>

    </div> 
  </div>
</template>
<script>

    import Vue from 'vue';

    export default{
        props:['id'],
        created:function(){
            this.getDetails();
            this.getComments()
        },
        data(){
            return{
                details:{},
                comments:[],
                pageIndex:1,
                value:''
            }
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
            },
            //获取评论
            getComments:function(){
                var id = this.id;
                var url = 'getcomments/'+id+'?pageindex='+this.pageIndex;
                this.axios
                    .get(url)
                    .then((res)=>{
                    if(res.status === 200){
                        // console.log(res.body.message);
                        this.comments = this.comments.concat(res.data.message);
                    }else{
                        console.log('获取数据失败');
                    }   
                })
                .catch((err)=>{
                    console.error(err);
                })
            },
            //加载更多
            getMore(){
                this.pageIndex ++;
                this.getComments();
            },
            //提交评论
            submitComment(){
                //获取值
                var id = this.id;
                var url = 'postcomment/'+id;
                // console.log(value);
                //判断数据
                if(this.value == '' || this.value.trim().length ==0){
                    this.$toast('评论内容不能为空');
                    return;
                }
                //发送请求
                this.axios
                    .post(url, 'content='+this.value)
                    .then((response)=> {
                        // console.log(response.data);
                        if(response.status === 200){
                            this.comments.unshift({
                                user_name:'匿名用户',
                                add_time:new Date(),
                                content:this.value
                            });
                            //置空
                            this.value = '';
                        }
                        this.$toast(response.data.message);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
     /*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    
    .submitcomment button {
        width: 96%;
    }
    
    .comment .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    .item .content{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>

