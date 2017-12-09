//导入插件
import Vue from 'vue';
//導入mui框架
import '../../../static/css/mui.min.css';

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

//导入axios模块
import axios from 'axios';
//绑定基地址
axios.defaults.baseURL = 'http://vue.studyit.io/api/';
//将axios绑定到Vue原型上
Vue.prototype.http = axios;
Vue.prototype.axios = axios;


 //导入放大效果的vue-preview视图  在图片分享详情页面使用
 import VuePreview from 'vue-preview';
 //注入到Vue
 Vue.use(VuePreview);

