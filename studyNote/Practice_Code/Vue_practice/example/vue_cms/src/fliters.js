// 这个js模块主要是做全局过滤器

// 导入 vue
import Vue from 'vue';

// 导入moment时间处理函数，过滤器
import moment from 'moment';
Vue.filter('dateFormat', function (dataStr, format='YYYY-MM-DD HH:mm:ss') {
        return moment(dataStr).format(format);
});
