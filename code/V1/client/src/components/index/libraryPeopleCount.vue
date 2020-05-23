<template>
    <!-- **********到馆人数统计********** -->
    <div class="count-area">
        <div class="title">到馆人数统计</div>
        <div class="subtitle">
            <div>今日到馆人数: <span>{{peopleInLibrary}}</span></div>
            <div>本周到馆人数: <span>{{weekCount}}</span></div>
            <div>总计到馆人数: <span>{{totalCount}}</span></div>
        </div>
        <div id="myChart1"></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                count:[],  //人数
                hoursCount:[], //时间段
                peopleInLibrary:0,  //今日到馆人数   
                weekCount:0,    //本周到馆人数
                totalCount:0    //总计到馆人数
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart1'))
                var url="library-people-count"
                this.axios.get(url)
                .then(res=>{
                    // console.log(res)
                    if(res.data.code==200){
                        var arr=res.data.data.hoursCount
                        for(var i=0;i<arr.length;i++){
                            this.count.push(arr[i].count)
                            this.hoursCount.push(arr[i].time)
                        }
                        this.peopleInLibrary=res.data.data.peopleInLibrary  //每日到馆人数
                        this.weekCount=res.data.data.weekCount  //每周到馆人数
                        this.totalCount=res.data.data.totalCount  //总计到馆人数
                            // 绘制图表
                        var option={
                            color:['#8ee2c1'],
                            grid: {  
                                left: '5%',  
                                right: '5%',  
                                top: '10%',
                                bottom:'20%',  
                                containLabel: true  
                            }, 
                            
                            xAxis: [{
                                data:this.hoursCount,
                                axisLabel:{
                                    interval:0,
                                    textStyle:{fontSize:10}
                                }
                            }],
                            yAxis: {
                                splitLine:{ show:false},
                                axisLabel:{                   
                                    textStyle:{fontSize:10}
                                }
                            },
                            series: [{
                                name: '人数',
                                type: 'bar',
                                data: this.count
                            }]
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
</script>

<style scoped>
    .count-area{
        width:442rem;
        height:166rem;
        border-radius: 20rem;
        background: #f0f1f1;
        text-align: center; 
          margin-left: -10rem;
    }
    .title{
        font-weight: bold;
        font-size: 24rem;
        margin-top:5rem;
        margin-bottom:7rem;
    }
    .subtitle{
        display: flex;
        font-size: 14rem;
        justify-content: center;
    }
    .subtitle span{
        color:#FC7C47;
    }
    .subtitle div:nth-child(2){
        margin-left:23rem;
        margin-right:23rem;
    }
    #myChart1{
        width: 100%; 
        height:120rem;
    } 
</style>