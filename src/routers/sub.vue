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
    <div>我是/sub</div>
    <p>当前auth: {{$route.sub}}</p>
    <a v-link="{ name: 'chart', params: { username: 'cchart' }}">回到chart</a>
</template>
<script>

    module.exports = {
        data: function() {
            return {

            }
        },
        ready: function() {
            
        },
        beforeDestroy: function() {

        },
        methods: {
            
        }
    }
</script>
