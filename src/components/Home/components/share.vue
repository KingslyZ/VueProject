<template>
    <div class="mui-content">
        <div class="category">
            <ul ref="cul">
                <li v-for="(item,index) in category" :key="index">
                    <a @click ="getImgList(item.id)">{{item.title}}</a>
                </li>      
            </ul>
        </div>
        <!-- 图片详情 -->
        <div class="img">
            <ul>
                <li v-for="(item ,index) in imgList" :key="index">
                    <router-link v-bind='{to:"shareInfo/"+item.id}'>
                        <img :src="item.img_url">
                         
                        <p>
                            <span>{{item.title}}</span><br>
                            <span>{{item.zhaiyao}}</span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
   
    export default{
        data(){
            return {
                category:[],
                imgList:[]
            }
        },
        created:function(){
            this.getCategory(),
            this.getImgList(0)
        },
        methods:{
            getCategory:function(){
                var url ="http://vue.studyit.io/api/getimgcategory";
                this.$http.get(url).then(function(res){
                    console.log(res.body.message);
                    this.category = res.body.message;
                })
            },
            getImgList:function(id){
                //获取id
                
                var url = "http://vue.studyit.io/api/getimages/"+id;
                this.$http.get(url).then(function(res){
                    console.log(res.body.message);
                    this.imgList = res.body.message;
                })
            }
        }
    }
</script>
<style scoped>
    .category{
        background-color: #fff;
        margin: 0;
        padding: 0;
    }
    .category ul{
        list-style: none;
        overflow: hidden;
    }
     .category ul li{
        float: left;
        padding-left: 4px;
        color:#0094ff;
        font-size: 12px;
    }


    .img{
        margin: 0;
        padding: 0;
    }
    .img ul{
        list-style: none;
        margin: 0;
        padding: 0;
    }
    .img li{
        position: relative;
    }
    .img li img{
        width: 100%;
    }
    .img li p{
        position: absolute;
        bottom:0;
        left:0;
        color:#fff;
    }
</style>


