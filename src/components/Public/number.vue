<template>
    <div class="number">
        <div @click='add' class="left">+</div><div class="middle">{{ count }}</div><div @click='sub' class="right">-</div>
    </div>
</template>
<script>
    export default {
        props:['quality'],
        data(){
            return{
                count:1
            }
        },
        methods:{
            add(){
                if(this.count >= this.quality){
                    this.$toast('库存不足');
                    return;
                }
                this.count++;
                this.modify();
            },
            sub(){
                if(this.count <= 1){
                    return;
                }
                this.count --;
                this.modify();
            },
             //自定义事件
            modify(){
                this.$emit('countChange',this.count);
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
