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
        <my-comment :id="id"></my-comment>
    </div>
    
</template>
<script>
   
    //导入评论组件
    import myComment from '../../Public/comments.vue';
    
    export default{
        props:['id'],
        data(){
            return{
                imgInfo:{},
                picInfo:[],
                comments:[],
                pageIndex:1
            }
        },
        created:function(){
            this.getImgInfo(),
            this.getPic()
          
        },
        components:{
            myComment
        },
        methods:{
            //获取文字信息
            getImgInfo:function(){
                var id = this.id;
                var url = "getimageInfo/"+id;
                this.axios
                    .get(url)
                    .then((res)=>{
                    console.log(res.data.message);
                    this.imgInfo = res.data.message[0];
                })
                .catch((err)=>{
                    console.error(err);
                })
            },
            //获取图片信息
            getPic:function(){
                var id =this.id;
                var url = "http://vue.studyit.io/api/getthumimages/"+id;
                this.axios
                    .get(url)
                    .then((res)=>{
                    console.log(res.data.message);
                    this.picInfo = res.data.message;
                    this.picInfo.forEach(function(item){
                        item.h = 400;
                        item.w = 600;
                    })
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
