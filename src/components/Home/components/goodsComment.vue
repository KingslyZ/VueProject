<template>
    <div class="mui-content">
       <my-comments :id='id'></my-comments>
    </div>
</template>
<script>
//导入评论组件
import myComments from '../../Public/comments.vue';
    export default {
        props:['id'],
        components:{
            myComments
        }
    }
</script>
<style scoped>

</style>
