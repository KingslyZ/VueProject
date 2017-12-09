//导入插件
import Vue from 'vue';
//導入mui框架
import '../../../static/css/mui.min.css';

import MintUI from 'mint-ui';
Vue.use(MintUI);
import '../../../static/css/style.css';
//导入axios模块
import axios from 'axios';


//绑定基地址
axios.defaults.baseURL = 'http://vue.studyit.io/api/';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//将axios绑定到Vue原型上
Vue.prototype.http = axios;
Vue.prototype.axios = axios;


