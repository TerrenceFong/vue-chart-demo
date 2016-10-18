<style scoped>
.btn{
    background: #f60;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    color: #fff;
}
.charts{
    width: 90%;
    height: 500px;
    margin: 0 auto;
    border: 1px solid #222;
    position: relative;
}
.chart{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.chart.diff{
    right: 50%;
}
.chart.diff.right{
    left: 50%;
    right: 0;
}
</style>
<template>
    <div class="btn" @click="toggleDiff()">
        <template  v-if="is_diff">
            关闭对比
        </template>
        <template v-else>
            打开对比
        </template>
    </div>
    <div class="charts">
        <div class="chart" v-if="!is_diff">
            <bar v-ref:bar></bar>
        </div>
        <div class="chart diff" v-if="is_diff">
            <bar diff v-ref:bar-diff></bar>
        </div>
        <div class="chart diff right" v-if="is_diff">
            <bar diff right v-ref:bar-diff-right></bar>
        </div>
    </div>
    <a v-link="{path: '/index'}">回到首页</a><br>
    <!-- replace: true => 不留下历史记录 前进后退失效 -->
    <a v-link="{ name: 'charts', params: { username: 'ssub' }, activeClass: 'custom-active-class'}">打开sub</a>
    <div>
        <p>当前路径: {{$route.path}}</p>
        <p>当前auth: {{$route.sub}}</p>
        <p>当前路由参数: {{$route.params | json}}</p>
        <p>路由中查询参数的键值对: {{$route.query | json}}</p>
        <p>路由规则所属的路由器: {{$route.router}}</p>
        <p>所有片段所对应的配置参数对象: {{$route.matched | json}}</p>
        <p>当前路径的名字: {{$route.name}}</p>
    </div>

    <br>
    <router-view></router-view>
</template>
<script>
    import Vue from 'vue'
    // bar组件是表格组件   chart.vue是路由组件   一个chart路由组件里面有多个bar表格组件
    import Bar from '../components/bar.vue'

    module.exports = {
        components: {
            'bar':Bar
        },
        data: function() {
            return {
                is_diff: false,
            }
        },
        ready: function() {
            this.setData()
            console.log(this.$route.params.username)
        },
        beforeDestroy: function() {

        },
        methods: {
            toggleDiff: function(){
                var _this = this;
                if(this.is_diff){
                    this.is_diff = false
                    Vue.nextTick(function(){
                        _this.setData()    
                    })
                }else{
                    this.is_diff = true
                    Vue.nextTick(function(){
                        _this.setDataDiff()
                        _this.setDataDiffRight() 
                    })
                }
            },
            setData: function(){
                var data_bar = {
                    key: ['周一', '周二', '周三', '周四', '周五'],
                    value: [10,20,30,40,50]
                }
                this.$refs.bar.$emit('set-bar-data', data_bar)
            },
            setDataDiff: function(){
                var data_bar = {
                    key: ['周一', '周二', '周三', '周四', '周五'],
                    value: [40,50,30,10,20]
                }
                this.$refs.barDiff.$emit('set-bar-data', data_bar)
            },
            setDataDiffRight: function(){
                var data_bar = {
                    key: ['周一', '周二', '周三', '周四', '周五'],
                    value: [20,10,50,40,30]
                }
                // refs -> 只给某一个组件触发
                this.$refs.barDiffRight.$emit('set-bar-data', data_bar)
            }
        }
    }
</script>
