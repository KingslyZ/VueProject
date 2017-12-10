<template>
    <div class="mui-content">
        <div class="category">
            <ul :style="ulWidth">
                <li>
                    <a @click.prevent ="getImgList(-1)" href="javascript:;">全部</a>
                </li>
                <li v-for="(item,index) in category" :key="index">
                    <a @click.prevent ="getImgList(item.id)" href="javascript:;">{{item.title}}</a>
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
                imgList:[],
                ulWidth:'width:0px'
            }
        },
        created:function(){
            this.getCategory(),
            this.getImgList(-1)
        },
        methods:{
            getCategory:function(){
                var url ="getimgcategory";
                this.axios
                    .get(url)
                    .then((res)=>{
                    console.log(res.data.message);
                    this.category = res.data.message;
                    this.ulWidth='width:'+((this.category.length+1)*78)+'px';
                })
                .catch((err)=>{
                    console.error(err);
                })
            },
            getImgList:function(id){
                // alert(id)
                //获取id
                var url = "getimages/"+id;
                this.axios
                    .get(url)
                    .then((res)=>{
                    console.log(res.data.message);
                    this.imgList = res.data.message;
                })
                .catch((err)=>{
                    console.error(err);
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
        overflow-x: auto;
        overflow-y: hidden;
    }
    .category ul{
        list-style: none;
        margin-left: 0;
        padding-left: 0;
        height:40px;
    }
     .category ul li{
        float: left;
        color:#0094ff;
        font-size: 14px;
        width:78px;
        padding: 10px 5px;
        box-sizing: border-box;
        text-align: center;
    }
    /* 取消下滑的滚动条 */
    ::-webkit-scrollbar{
        display: none;
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
        vertical-align: middle;
    }
    .img li p{
        margin: 0;
        padding: 0;
        position: absolute;
        bottom:0;
        left:0;
        color:#fff;
        background-color: rgba(0,0,0,0.5)
    }
</style>


