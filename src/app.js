//导入Vue模块
import Vue from 'vue';

//导入组件
import app from './app.vue';

//导入插件
import './components/Config/plugins.js';

//导入过滤器模块
import './components/Config/filter.js';

//导入路由模块
import router from './components/Config/router.js';

//导入设置图片大小的css文件
import '../static/css/style.css';
//实例化Vue对象
let vm = new Vue({
    el:"#app",
    router,
    render:function(createElement){
        return createElement(app);
    },
    created(){
        // Add a request interceptor
        this.axios.interceptors.request.use((config)=> {
            // Do something before request is sent
            this.$indicator.open('加载中...');
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });
        
        // Add a response interceptor
        this.axios.interceptors.response.use( (response) =>{
            // Do something with response data
            this.$indicator.close();
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
    }
})