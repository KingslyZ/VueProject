<template>
    <div class="mui-content">
        <ul class="mui-table-view">
            <li v-for="item in newsList" :key='item.id' class="mui-table-view-cell mui-media">
                <router-link v-bind='{to:"/newsDetails/"+item.id}'>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url" alert="新闻详情">
                    <div class="mui-media-body">
                       {{item.title}}
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | fmtdate('YYYY-MM-DD')}}</span>
                            <span>点击数：{{item.click}}</span> 
                        </p>
                    </div>
                </router-link>
            </li>
           
		</ul>
    </div>
</template>
<script>
    import Vue from 'vue';

    export default{
        data(){
            return {
                newsList:[]
            }
        },
        created:function(){
            this.getnews()
        },
        methods:{
            //使用axios获取数据
            getnews(){
                this.axios
                    .get('getnewslist')
                    .then((res)=>{
                        this.newsList = res.data.message;
                    })
                    .catch((err)=>{
                        console.error(err);
                    })
            }
        }  
       
    }
</script>
<style scoped>
    .mui-media-body{
        font-size: 15px;
    }
    /* 设置左右 */
    .mui-table-view .mui-ellipsis{
        display: flex;
        justify-content:space-between;
        color:#0094ff;
        font-size: 12px;
    }
    .mui-content>.mui-table-view:first-child {
        margin-top: 0;
    }
    /* 设置省略号 后者 添加类名mui-ellipsis*/
    .mui-media-body{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
   
</style>

