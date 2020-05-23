<template>
    <!-- **********借阅量数据展示********** -->
    <div class="borrowing-area">
        <div id="myChart2" style=" font-size: 10rem;">

        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                hoursCount:[],  //时间段
                count:[],  //当天借阅数据
                total_count:[],  ///总计借阅数据
                time_type:""   //时间类型
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart2'))
                // 绘制图表 
                var url="borrowing-count"
                this.axios.get(url)
                .then(res=>{
                    // console.log(res)
                    if(res.data.code==200){
                        var arr=res.data.data.items 
                        this.time_type=res.data.data.time_type
                        for(var i=0;i<arr.length;i++){
                            this.hoursCount.push(arr[i].time_format)
                            this.count.push(arr[i].count)
                            this.total_count.push(arr[i].total_count)   
                        }
                        var option={
                            title: {
                                text: `借阅量数据展示（${this.time_type}）`,
                                left:'center',
                                textStyle:{
                                    fontSize:30,
                                    fontWeight:700,
                                   
                        
                                },
                            },                   
                            legend: {
                                data: ['总借阅', '当天借阅'],
                                bottom:'auto',
                                orient: 'vertical',
                                itemGap: 3,
                                x:'right',
                                align: 'left',
                                left: 5                                      
                            },
                            textStyle:{
                                fontSize:15
                            },
                            grid: {
                                left: '5%',
                                right: '5%',
                                bottom: '3%',
                                top:'20%',
                                containLabel: true
                            },
                            color:['#8ee2c0','#ffbca0'], 
                            xAxis: {
                                type: 'value',
                                boundaryGap:[0,0.01],
                                splitLine:{show:false},
                                position:'left',
                                axisLabel:{
                                    interval: 0,
                                    textStyle:{fontSize:15}
                                }
                            },
                            yAxis: {
                                type:'category',
                                data:this.hoursCount,
                                position:'left',
                                borderwidth:0,
                                splitLine:{show:false},
                                axisTick:{show:false},
                                axisLabel:{                   
                                    textStyle:{fontSize:15}
                                }
                            },
                            series: [
                                {
                                    name: '总借阅',
                                    type: 'bar',
                                    barGap:0,   //消除不同柱子之间的间距
                                    data: this.total_count
                                },
                                {
                                    name: '当天借阅',
                                    type: 'bar',
                                    data: this.count                               
                                }
                            ]
                        };
                        myChart.setOption(option)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })  
            }
        } 
    }
</script>zzzz

<style scoped>
.borrowing-area{
     width:442rem;
        height:186rem;
        border-radius: 20rem;
        background: #f0f1f1;
        padding-top:7px;
          margin-left: -10rem;
          margin-bottom: 10rem;
           font-size: 10rem;

}
    #myChart2{
        height: 179rem;
        font-size: 10rem;
        
    }
</style>