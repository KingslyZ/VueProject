import moment from 'moment';
import Vue from 'vue';

//全局过滤器
Vue.filter('fmtdate',function(input,format){
    return moment(input).format(format);
})