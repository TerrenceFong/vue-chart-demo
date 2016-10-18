/**
 * Created by aresn on 16/6/20.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource'
import App from 'components/app.vue';

Vue.use(VueRouter);

// 开启debug模式
Vue.config.debug = true;

// 路由配置
var router = new VueRouter({
    // 是否开启HTML5的history模式,开启后,需服务端支持,否则404
    history: false
});

//Resource
Vue.use(VueResource);

//可以让浏览器不发送OPTIONS预请求
Vue.http.options.emulateJSON = true

Vue.http.interceptors.push(function (request, next) {
    if(request.url !== 'http://211.149.193.19:8100/token'){
        request.headers.Authorization = 'Bearer ' + sessionStorage.getItem('accessToken')
        console.log(request.headers)
    }
    this.showLoading = true
    // console.log(this) // 如果用箭头函数 此处则打印出undefined
    next(function (response) {
        response.headers.Authorization = 'Bearer ' + sessionStorage.getItem('accessToken')
        if (!response.ok) {
            this.errorCode = response.status
            this.showDialog = true
        }
        this.showLoading = false
        return response
    });
});

router.map({
    '/index': {
        name: 'index',
        component: function(resolve) {
            require(['./routers/index.vue'], resolve);
        },
        auth: true // 这里 auth 是一个自定义字段
    },
    // '/chart': {
    '/chart/:username': {
        name: 'chart',
        component: function(resolve) {
            require(['./routers/chart.vue'], resolve);
        },
        subRoutes: {
            '/': {
                // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
                // 为了简便，这里使用了一个组件的定义
                component: {
                    template: '<p>用户名是{{$route.params.username}}</p>'
                }
            },
            // 其他子路由
            '/sub': {
                name: 'charts',
                component: function(resolve) {
                    require(['./routers/sub.vue'], resolve);
                },
                sub: "sub",
            }
        },
        sub: "chart"
    }

});

//路由切换之前触发的事件
router.beforeEach(function () {
    //回到页面顶部
    window.scrollTo(0, 0);
});

//路由切换成功后触发
router.afterEach(function (transition) {

});

//页面重定向
router.redirect({
    '*': "/index"
});
router.start(App, '#app');

