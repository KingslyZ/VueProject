<template>
    <div class="mui-content">
        <div class="title">
            <h4>{{imgInfo.title}}</h4>
            <p>
                <span>{{imgInfo.add_time | fmtdate('YYYY-MM-DD')}}</span>&emsp;&emsp;
                <span>{{imgInfo.click}}次浏览</span>
            </p>
        </div>
        <div class="img">
            <ul>
                <li v-for="(item,index) in picInfo" :key="index">
                    <img class="preview-img" :src="item.src" height ="100px" @click='$preview.open(index, picInfo)'>
                </li>
            </ul>
            <div class="content" v-html="imgInfo.content">

            </div>
        </div>
        <hr>
        <!-- 评论专区 -->
        <div class="comment">
            <div class="title">
                <h4>提交评论</h4>
            </div>
            <div class="submit">
                <textarea placeholder="请输入评论内容"></textarea>
                <button class="mui-btn mui-btn-primary">发表</button>
            </div>
            <!-- 评论列表 -->
            <div class="commentList">
                <h4>评论列表</h4>
                <ul>
                    <li v-for="(item,index) in comments" :key="index">
                        <div class="content">{{item.content}}</div>
                        <div class="info">
                            <span>{{item.user_name}}</span>
                            <span>{{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}</span>
                        </div>
                    </li>
                   
                   
                </ul>
            </div>
            <!-- 加载更多 -->
             <button class="mui-btn mui-btn-primary mui-btn-outlined" @click="getMore">加载更多</button></button>
        </div>
    </div>
    
</template>
<script>
    import Vue from 'vue';
    //导入放大效果的vue-preview视图
    import VuePreview from 'vue-preview';
    //注入到Vue
    Vue.use(VuePreview);

    export default{
        props:['id'],
        data(){
            return{
                imgInfo:[],
                picInfo:[],
                comments:[],
                pageIndex:1
            }
        },
        created:function(){
            this.getImgInfo(),
            this.getPic(),
            this.getComment()
        },
        methods:{
            //获取文字信息
            getImgInfo:function(){
                var id = this.id;
                var url = "http://vue.studyit.io/api/getimageInfo/"+id;
                this.$http.get(url).then(function(res){
                    console.log(res.body.message);
                    this.imgInfo = res.body.message[0];
                },function(err){
                    console.log('暂无相关数据');
                })
            },
            //获取图片信息
            getPic:function(){
                var id =this.id;
                var url = "http://vue.studyit.io/api/getthumimages/"+id;
                this.$http.get(url).then(function(res){
                    console.log(res.body.message);
                    this.picInfo = res.body.message;
                    this.picInfo.forEach(function(item){
                        item.h = 400;
                        item.w = 600;
                    })
                },function(err){
                    console.log('暂无相关数据');
                })
            },
            //获取评论信息
            getComment(){
                var id = this.id;
                var url = "http://vue.studyit.io/api/getcomments/"+id+"?pageindex="+this.pageIndex;
                //发送请求
                this.$http.get(url).then((res)=>{
                    console.log(res.body);
                    if(res.body.status ===0){
                        this.comments = res.body.message
                    }else{
                        alert('暂无数据');
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            //加载更多
            getMore(){
                this.pageIndex++;
                this.getComment();
            }
        }
    }
</script>
<style scoped>
    .mui-content{
        background-color: #fff;
    }
    .title{
        font-size: 12px;
        color:#0094ff;
        padding: 4px;
    }
    .title span{
        color:#ccc;
    }
    .img{

    }
    .img ul{
        padding: 0;
        margin: 0;
        overflow: hidden;
        list-style: none;
    }
    .img ul li{
        float: left;
        width:33%;
        padding:10px;
    }
     .img ul li img{
        width: 100%;
    }
    .content{
        color:#8f8f94;
        font-size: 14px;
        padding: 4px;
    }

    .comment{

    }
    .comment .title{
        color:#000;
    }
    .comment .submit{
        padding: 10px;
    }
    .mui-btn{
        width: 100%;
    }
    .comment .commentList{
        border-top:1px solid #ccc;
    }
    .comment .commentList h4{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        padding-left: 10px;
    }
    .comment .commentList ul{
        list-style: none;
        padding: 0;
        margin: 0;
        margin-bottom: 10px;
    }
    .comment .commentList ul li{
        padding: 8px;
        border-bottom: 1px solid #ccc;
    }
    .comment .commentList ul li .content{
        font-size: 16px;
        color:#000;
        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis; 
    }
    .comment .commentList ul li .info{
        display: flex;
        justify-content:space-between;
        color:#0094ff;
        font-size: 15px;
    }
</style>
