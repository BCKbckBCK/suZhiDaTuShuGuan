<template>
  <div class="content">
    <h2>阅读之星</h2>
    <!-- <timeSelectComponent></timeSelectComponent>
    <el-table :data="readerStar" style="width:500px;border:1px solid #000;margin-top:10px">
      <el-table-column type="index" label="排行" width="100" align="center"></el-table-column>
      <el-table-column prop="reader_name" label="姓名" width="200" align="center"></el-table-column>
      <el-table-column prop="read_duration" label="借阅时长" align="center"></el-table-column>
    </el-table> -->
    <span>起始时间</span>
    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
    </el-date-picker><br>
    <span>结束时间</span>
    <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间">
    </el-date-picker><br>
    <span>显示数量</span>
    <el-input v-model="count" style="width:50px"></el-input><br>
    <el-button type="primary" style="margin-top:20px" @click="set()">确定</el-button>
  </div>
</template>

<script>
  import timeSelectComponent from './category/timeSelect.vue'
  export default {
    data() {
      return {
        readerStar:[{reader_name:'张三',read_duration:5},{reader_name:'李四',read_duration:6}],
        value1:'',  //起始时间
        value2:'',  //结束时间
        count:''  //数量
      }
    },
    components:{timeSelectComponent},
    methods: {
      //设置
      set(){
        var url="reader-star/set-show-type"
        var time_value=this.value1+'@'+this.value2
        var display_count=this.count
        var obj={time_value,display_count}
        //console.log(obj)
        this.axios.post(url,this.qs.stringify(obj))
        .then(res=>{
          //console.log(res)
          if(res.data.code==200){
            this.$message.success('设置成功')
          }else{
            this.$message.error('设置失败')
          }
        })
        .catch(err=>{
          this.$message.error('服务器发生错误')
        })
      }
    },
  }
</script>

<style scoped>
  .content{
    font-size:16px
  }
</style>