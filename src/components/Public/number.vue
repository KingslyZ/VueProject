<template>
    <div class="number">
        <div @click='add' class="left">+</div><div class="middle">{{ count }}</div><div @click='sub' class="right">-</div>
    </div>
</template>
<script>
    //导入通信模块
    import vueObj from '../../components/Config/communication.js';
    //导入本地存储
    import { updateData } from '../../components/Public/localStorageHelp.js';

    export default {
        //num 是购物车上的总数 id 是为了在shopcar页面点击加减的时候更新数据
        props:['quality','num','id'],
        data(){
            return{
                // count:1,
                count:this.num ? this.num : 1,
                type:''
            }
        },
        created(){
            
        },
        methods:{
            add(){
                if(this.count >= this.quality){
                    this.$toast('库存不足');
                    return;
                }
                this.count++;
                //要写在modify 之前
                this.type = 'add' ;
                //更新localStorage中的数据 要写在modify之前
                //否则 此时会造成不同步修改badge的数据
                // updateData({id:this.id,type:1});
                this.modify();
             
            },
            sub(){
                if(this.count <= 1){
                    return;
                }
                this.count --;
                this.type = 'sub';
                //更新localStorage中的数据 要写在modify之前
                //否则 此时会造成不同步修改badge的数据
                //推荐写在 shopcar.vue调用countChange的时候更新数据，并且同时通知app.vue修改badge
                // updateData({id:this.id,type:-1});
                this.modify();
                
                // 1.更新localStorage中的数据
                    //调用事件countChange的时候改变数据
                // 2.修改app.vue上的badge的值

            },
            //自定义事件
            modify(){
                this.$emit('countChange',{id:this.id,count:this.count,type:this.type});
                
                // console.log(this.count);
            }
            
        }
       
    }
</script>
<style scoped>
    .number{
        display: inline-block;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .number .left,
    .number .middle,
    .number .right{
        height: 30px;
        width:25px;
        line-height: 30px;
        text-align: center;
        border:1px solid #ccc;
        display: inline-block;
    }
    .number .middle{
        width: 40px;
    }
</style>
