<style scoped>

</style>
<template>
    <!-- v-el:chart 获取当前dom -->
    <div class="chart" v-el:chart>
        
    </div>
    

</template>
<script>
    import echarts from 'echarts'

    module.exports = {
        props: {
            diff: {
                type: Boolean,
                default: false
            },
            right: {
                type: Boolean,
                default: false
            }
        },
        data: function() {
            return {
                data: {
                    key: [],
                    value: []
                }
            }
        },
        ready: function() {
            // this.initChart()
        },
        beforeDestroy: function() {
            this.myChart.dispose();
        },
        events: {
            'set-bar-data': function(data){
                this.data = data
                this.initChart()
            }
        },
        methods: {
            initChart: function(){
                this.myChart = echarts.init(this.$els.chart)
                var series = [
                    {
                        type: 'bar',
                        name: 'chart',
                        data: this.data.value
                    }
                ]
                var option = {
                    yAxis: {
                        type: 'value'
                    },
                    xAxis: {
                        typpe: 'category',
                        data: this.data.key
                    },
                    itemStyle: {
                        normal: {
                            color: this.right ? 'blue' : 'red'
                        }
                    },
                    series: series
                }
                this.myChart.setOption(option)
            }
        }
    }
</script>
